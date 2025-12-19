import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const IMAGE_URL = `${process.env.BASE_URL || 'http://localhost:5001'}/images/attached-profile.jpg`;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in environment. Aborting.');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update the earliest created user (or first found) with the profileImage
    const user = await User.findOne().sort({ createdAt: 1 });
    if (!user) {
      console.error('No users found in database.');
      process.exit(1);
    }

    user.profileImage = IMAGE_URL;
    await user.save();

    console.log(`Updated profileImage for user ${user.email} -> ${IMAGE_URL}`);
    process.exit(0);
  } catch (err) {
    console.error('Error updating profile image:', err);
    process.exit(1);
  }
}

run();
