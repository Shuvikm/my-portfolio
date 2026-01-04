import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in environment. Aborting.');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: 'test@example.com' });
    if (existing) {
      console.log('Test user already exists:', existing.email);
      process.exit(0);
    }

    const user = new User({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    user.profileImage = `${process.env.BASE_URL || 'http://localhost:5001'}/images/my-logo.jpg`;
    await user.save();

    console.log('Created test user:', user.email);
    process.exit(0);
  } catch (err) {
    console.error('Error creating test user:', err);
    process.exit(1);
  }
}

run();
