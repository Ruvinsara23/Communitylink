const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
  });
  
  const PollSchema = new mongoose.Schema({
    title: { type: String, required: true },
    totalVotes: { type: Number, default: 0 },
    voted: { type: Boolean, default: false },
    options: [OptionSchema],
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community',
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  });
    
module.exports = mongoose.model('Poll', PollSchema);
