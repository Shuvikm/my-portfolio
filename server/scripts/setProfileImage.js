import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import User from '../models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const BASE_URL = process.env.BASE_URL || 'http://localhost:5001';
const IMAGE_NAME = 'attached-profile.jpg';
const IMAGE_PATH = path.join(process.cwd(), 'public', 'images', IMAGE_NAME);
const IMAGE_URL = `${BASE_URL}/images/${IMAGE_NAME}`;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in environment. Aborting.');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOne().sort({ createdAt: 1 });
    if (!user) {
      console.error('No users found in database.');
      process.exit(1);
    }

    // Read image file bytes if present
    if (fs.existsSync(IMAGE_PATH)) {
      const data = fs.readFileSync(IMAGE_PATH);
      user.profileImage = IMAGE_URL;
      user.profileImageData = data;
      user.profileImageContentType = 'image/jpeg';
      await user.save();

      console.log(`Updated profileImage and binary data for user ${user.email} -> ${IMAGE_URL}`);
    } else {
      // Fallback: only set URL
      user.profileImage = IMAGE_URL;
      await user.save();
      console.log(`Image file not found at ${IMAGE_PATH}. Set URL only for ${user.email}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error updating profile image:', err);
    process.exit(1);
  }
}

run();
