#!/usr/bin/env node

/**
 * Script to view all data stored in MongoDB
 * Shows Users, Contacts, Tokens (JWTs), and Projects
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Contact from '../models/Contact.js';
import Token from '../models/Token.js';
import Project from '../models/Project.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

async function viewMongoData() {
  try {
    console.log('🔌 Connecting to MongoDB...\n');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    console.log('='.repeat(80));

    // View Users
    console.log('\n📊 USERS COLLECTION');
    console.log('='.repeat(80));
    const users = await User.find().select('-password');
    console.log(`Total Users: ${users.length}\n`);
    if (users.length > 0) {
      users.forEach((user, index) => {
        console.log(`User ${index + 1}:`);
        console.log(`  ID: ${user._id}`);
        console.log(`  Name: ${user.name}`);
        console.log(`  Email: ${user.email}`);
        console.log(`  Profile Image: ${user.profileImage || 'Not set'}`);
        console.log(`  Created At: ${user.createdAt}`);
        console.log('');
      });
    } else {
      console.log('No users found.\n');
    }

    // View Contacts
    console.log('\n📧 CONTACTS COLLECTION');
    console.log('='.repeat(80));
    const contacts = await Contact.find().sort({ createdAt: -1 });
    console.log(`Total Contacts: ${contacts.length}\n`);
    if (contacts.length > 0) {
      contacts.forEach((contact, index) => {
        console.log(`Contact ${index + 1}:`);
        console.log(`  ID: ${contact._id}`);
        console.log(`  Name: ${contact.name}`);
        console.log(`  Email: ${contact.email}`);
        console.log(`  Phone: ${contact.phone || 'Not provided'}`);
        console.log(`  Subject: ${contact.subject || 'Not provided'}`);
        console.log(`  Message: ${contact.message.substring(0, 100)}${contact.message.length > 100 ? '...' : ''}`);
        console.log(`  Created At: ${contact.createdAt}`);
        console.log('');
      });
    } else {
      console.log('No contacts found.\n');
    }

    // View Tokens (JWTs)
    console.log('\n🔐 TOKENS COLLECTION (JWT Tokens)');
    console.log('='.repeat(80));
    const tokens = await Token.find().sort({ createdAt: -1 }).limit(20);
    const allTokens = await Token.countDocuments();
    console.log(`Total Tokens: ${allTokens} (showing latest 20)\n`);
    if (tokens.length > 0) {
      tokens.forEach((token, index) => {
        console.log(`Token ${index + 1}:`);
        console.log(`  ID: ${token._id}`);
        console.log(`  Type: ${token.type}`);
        console.log(`  User ID: ${token.userId || 'Visitor (no user)'}`);
        console.log(`  Token (JWT): ${token.token.substring(0, 50)}...`);
        console.log(`  Valid: ${token.isValid ? '✅ Yes' : '❌ No'}`);
        console.log(`  User Agent: ${token.userAgent || 'Unknown'}`);
        console.log(`  IP Address: ${token.ipAddress || 'Unknown'}`);
        console.log(`  Expires At: ${token.expiresAt}`);
        console.log(`  Created At: ${token.createdAt}`);
        console.log('');
      });
    } else {
      console.log('No tokens found.\n');
    }

    // View Projects
    console.log('\n🚀 PROJECTS COLLECTION');
    console.log('='.repeat(80));
    const projects = await Project.find().sort({ createdAt: -1 });
    console.log(`Total Projects: ${projects.length}\n`);
    if (projects.length > 0) {
      projects.forEach((project, index) => {
        console.log(`Project ${index + 1}:`);
        console.log(`  ID: ${project._id}`);
        console.log(`  Title: ${project.title}`);
        console.log(`  Description: ${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}`);
        console.log(`  Technologies: ${project.technologies.join(', ')}`);
        console.log(`  Featured: ${project.featured ? 'Yes' : 'No'}`);
        console.log(`  Created At: ${project.createdAt}`);
        console.log('');
      });
    } else {
      console.log('No projects found.\n');
    }

    // Summary
    console.log('\n📈 SUMMARY');
    console.log('='.repeat(80));
    console.log(`Users: ${await User.countDocuments()}`);
    console.log(`Contacts: ${await Contact.countDocuments()}`);
    console.log(`Tokens (JWTs): ${await Token.countDocuments()}`);
    console.log(`Projects: ${await Project.countDocuments()}`);
    console.log('='.repeat(80));

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

viewMongoData();

