import express from 'express';
import Contact from '../models/Contact.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST - Submit contact form (protected with JWT)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    // Capture the token used for this submission (if present)
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const newContact = new Contact({ name, email, phone, subject, message, token });
    await newContact.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully!',
      data: newContact 
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// GET - Get all contact messages (admin use)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;
