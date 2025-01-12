const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  chatID: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  senderID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  type: { type: String, default: 'text' }, 
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);
