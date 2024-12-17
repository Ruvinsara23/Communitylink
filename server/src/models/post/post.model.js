const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    communityId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Community', 
        required: true 
    }, 
    authorId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User', 
         required: true
         }, 
    content: { 
        type: String, 
        required: true 
    }, 
    image: { 
        type: String 
    }, 
    createdAt: { 
        type: Date, 
        default: Date.now 
    }, 
    reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }],  

    poll: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;