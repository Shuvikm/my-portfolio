import jwt from 'jsonwebtoken';
import Token from '../models/Token.js';

// Generate a token for contact form submission (simple visitor token) and save to DB
export const generateVisitorToken = async (req = null) => {
  const subject = 'visitor';
  const token = jwt.sign(
    { sub: subject, subject, type: 'visitor', timestamp: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Save token to database
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await Token.create({
    token,
    subject,
    type: 'visitor',
    userAgent: req?.headers?.['user-agent'] || 'Unknown',
    ipAddress: req?.ip || req?.connection?.remoteAddress || 'Unknown',
    expiresAt
  });

  return token;
};

// Generate a token for authenticated users and save to DB
export const generateUserToken = async (user, req = null) => {
  const subject = user.email || user.name || user._id.toString();
  const token = jwt.sign(
    { 
      sub: user._id.toString(),
      subject,
      id: user._id, 
      email: user.email, 
      name: user.name,
      type: 'user' 
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Save token to database
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  await Token.create({
    userId: user._id,
    token,
    subject,
    type: 'user',
    userAgent: req?.headers?.['user-agent'] || 'Unknown',
    ipAddress: req?.ip || req?.connection?.remoteAddress || 'Unknown',
    expiresAt
  });

  return token;
};

// Invalidate/revoke a token
export const revokeToken = async (token) => {
  await Token.findOneAndUpdate({ token }, { isValid: false });
};

// Invalidate all tokens for a user (logout from all devices)
export const revokeAllUserTokens = async (userId) => {
  await Token.updateMany({ userId, isValid: true }, { isValid: false });
};

// Verify JWT token middleware (also checks DB)
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify JWT signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if token exists and is valid in database
    const tokenDoc = await Token.findOne({ token, isValid: true });
    if (!tokenDoc) {
      return res.status(403).json({ error: 'Token has been revoked or is invalid.' });
    }

    req.user = decoded;
    req.tokenDoc = tokenDoc;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

// Verify user is authenticated (not just a visitor token)
export const verifyUserToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.type !== 'user') {
      return res.status(403).json({ error: 'Access denied. User authentication required.' });
    }

    // Check if token exists and is valid in database
    const tokenDoc = await Token.findOne({ token, isValid: true });
    if (!tokenDoc) {
      return res.status(403).json({ error: 'Token has been revoked or is invalid.' });
    }
    
    req.user = decoded;
    req.tokenDoc = tokenDoc;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

export default { generateVisitorToken, generateUserToken, verifyToken, verifyUserToken, revokeToken, revokeAllUserTokens };
