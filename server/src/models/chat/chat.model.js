const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  communityID: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isGroupChat: { type: Boolean, default: false },
  groupName: { type: String, default: null },
  groupAvatar: { type: String, default: null },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', ChatSchema);

// both memeber and community sceama has members and join community fields