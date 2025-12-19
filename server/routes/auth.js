import express from 'express';
import User from '../models/User.js';
import Token from '../models/Token.js';
import { generateVisitorToken, generateUserToken, verifyUserToken, revokeToken, revokeAllUserTokens } from '../middleware/auth.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// POST - Sign up (Register new user)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate JWT token and save to DB
    const token = await generateUserToken(user, req);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// POST - Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token and save to DB
    const token = await generateUserToken(user, req);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// POST - Set current user's profile image to the attached server image
router.post('/me/image', verifyUserToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // The attached image should be placed at server/public/images/attached-profile.jpg
    // If present, set user's profileImage to the served path
    user.profileImage = `${req.protocol}://${req.get('host')}/images/attached-profile.jpg`;
    await user.save();

    res.json({ success: true, message: 'Profile image set', user: user.toJSON() });
  } catch (error) {
    console.error('Set profile image error:', error);
    res.status(500).json({ error: 'Failed to set profile image' });
  }
});

// POST - Upload a base64 image and set as profile image (authenticated)
router.post('/upload-image', verifyUserToken, async (req, res) => {
  try {
    const { imageBase64, filename } = req.body;
    if (!imageBase64) return res.status(400).json({ error: 'imageBase64 is required' });

    // Data URL may start with 'data:image/jpeg;base64,...' or just raw base64
    const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
    let ext = 'jpg';
    let base64Data = imageBase64;
    if (matches) {
      const mime = matches[1];
      base64Data = matches[2];
      if (mime.includes('png')) ext = 'png';
      else if (mime.includes('jpeg') || mime.includes('jpg')) ext = 'jpg';
    }

    const imgBuffer = Buffer.from(base64Data, 'base64');

    const imagesDir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

    const outName = filename ? `${filename}` : `attached-profile.${ext}`;
    const outPath = path.join(imagesDir, outName);

    fs.writeFileSync(outPath, imgBuffer);

    // Update user's profileImage URL
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.profileImage = `${req.protocol}://${req.get('host')}/images/${outName}`;
    await user.save();

    res.json({ success: true, message: 'Image uploaded and profile updated', url: user.profileImage });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// POST - Logout (revoke token)
router.post('/logout', verifyUserToken, async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    
    await revokeToken(token);
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
});

// POST - Logout from all devices
router.post('/logout-all', verifyUserToken, async (req, res) => {
  try {
    await revokeAllUserTokens(req.user.id);
    
    res.json({
      success: true,
      message: 'Logged out from all devices successfully'
    });
  } catch (error) {
    console.error('Logout all error:', error);
    res.status(500).json({ error: 'Failed to logout from all devices' });
  }
});

// GET - Get current user profile (protected route)
router.get('/me', verifyUserToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

// GET - Get all tokens (for debugging/admin)
router.get('/tokens', async (req, res) => {
  try {
    const tokens = await Token.find().sort({ createdAt: -1 }).limit(50);
    res.json({
      success: true,
      count: tokens.length,
      tokens
    });
  } catch (error) {
    console.error('Get tokens error:', error);
    res.status(500).json({ error: 'Failed to get tokens' });
  }
});

// GET - Get a visitor token for contact form submission
router.get('/token', async (req, res) => {
  try {
    const token = await generateVisitorToken(req);
    res.json({ 
      success: true, 
      token,
      message: 'Token generated successfully' 
    });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

export default router;
