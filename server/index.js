import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import contactRoutes from './routes/contact.js';
import projectRoutes from './routes/projects.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Provide sensible default MongoDB URI for local dev if not provided
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

if (!process.env.JWT_SECRET) {
  console.warn('⚠️  Warning: JWT_SECRET is not set. Using a default insecure secret for local development. Set JWT_SECRET in your .env for production.');
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_for_dev_only';
}

// Middleware
app.use(cors());
// Increase JSON body limit to allow base64 image uploads
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Resolve __dirname for ESM and serve static images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// MongoDB Connectionok
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

// Root route - redirect to API health for a friendly root response
app.get('/', (req, res) => {
  return res.redirect('/api/health');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
