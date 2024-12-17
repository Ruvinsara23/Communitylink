const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  communityImage:{
    type: String, 
    default: '',
  },
  
  bannerImage: {
    type: String, 
    default: '',
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', 
    },
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  polls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll', 
    },
  ],
  issues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issue', 
    },
  ],
  slug: {
    type: String,
    required: true,
    unique: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


communitySchema.pre('validate', async function (next) {
  if (this.isNew || this.isModified('name')) {
   
    const baseSlug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
  
    let uniqueSlug = baseSlug;
    let count = 0;

    while (await mongoose.models.Community.findOne({ slug: uniqueSlug })) {
      count++;
      uniqueSlug = `${baseSlug}-${count}`;
    }

    this.slug = uniqueSlug || uuidv4(); 
  }

  next();
});

module.exports = mongoose.model('Community', communitySchema);
