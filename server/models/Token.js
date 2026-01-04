import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // null for visitor tokens
  },
  token: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    default: null
  },
  type: {
    type: String,
    enum: ['visitor', 'user', 'refresh'],
    required: true
  },
  userAgent: {
    type: String
  },
  ipAddress: {
    type: String
  },
  isValid: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for automatic cleanup of expired tokens
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Index for quick lookup
tokenSchema.index({ token: 1 });
tokenSchema.index({ userId: 1 });

export default mongoose.model('Token', tokenSchema);
