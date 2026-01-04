import express from 'express';
import User from '../models/User.js';
import Contact from '../models/Contact.js';
import Token from '../models/Token.js';
import Project from '../models/Project.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// GET - View all MongoDB data (admin endpoint)
router.get('/data', async (req, res) => {
  try {
    const [users, contacts, tokens, projects] = await Promise.all([
      User.find().select('-password').lean(),
      Contact.find().sort({ createdAt: -1 }).lean(),
      Token.find().sort({ createdAt: -1 }).limit(50).lean(),
      Project.find().sort({ createdAt: -1 }).lean()
    ]);

    // Decode JWT tokens to show their payload
    const tokensWithDecoded = tokens.map(token => {
      try {
        const decoded = jwt.decode(token.token);
        return {
          ...token,
          decodedPayload: decoded
        };
      } catch (error) {
        return {
          ...token,
          decodedPayload: null,
          decodeError: 'Invalid JWT format'
        };
      }
    });

    res.json({
      success: true,
      summary: {
        users: users.length,
        contacts: contacts.length,
        tokens: await Token.countDocuments(),
        projects: projects.length
      },
      data: {
        users,
        contacts,
        tokens: tokensWithDecoded,
        projects
      }
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// GET - View specific collection
router.get('/data/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    let data;

    switch (collection.toLowerCase()) {
      case 'users':
        data = await User.find().select('-password').lean();
        break;
      case 'contacts':
        data = await Contact.find().sort({ createdAt: -1 }).lean();
        break;
      case 'tokens':
        const tokens = await Token.find().sort({ createdAt: -1 }).limit(100).lean();
        data = tokens.map(token => {
          try {
            const decoded = jwt.decode(token.token);
            return {
              ...token,
              decodedPayload: decoded
            };
          } catch (error) {
            return {
              ...token,
              decodedPayload: null
            };
          }
        });
        break;
      case 'projects':
        data = await Project.find().sort({ createdAt: -1 }).lean();
        break;
      default:
        return res.status(400).json({ error: 'Invalid collection. Use: users, contacts, tokens, or projects' });
    }

    res.json({
      success: true,
      collection,
      count: data.length,
      data
    });
  } catch (error) {
    console.error(`Error fetching ${req.params.collection}:`, error);
    res.status(500).json({ error: `Failed to fetch ${req.params.collection}` });
  }
});

// GET - Decode a specific JWT token
router.get('/decode-token/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    // Try to decode without verification first
    const decoded = jwt.decode(token, { complete: true });
    
    if (!decoded) {
      return res.status(400).json({ error: 'Invalid JWT token format' });
    }

    // Also check if token exists in database
    const tokenDoc = await Token.findOne({ token }).lean();

    res.json({
      success: true,
      token: {
        header: decoded.header,
        payload: decoded.payload,
        signature: decoded.signature.substring(0, 20) + '...'
      },
      databaseInfo: tokenDoc || null
    });
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(500).json({ error: 'Failed to decode token' });
  }
});

export default router;

