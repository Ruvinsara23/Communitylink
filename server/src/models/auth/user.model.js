const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUID:
   { type: String,
     required: true,
     unique: true }, 

 displayName:
   { type: String,
     required: true },

  email:
   { type: String, 
    required: true, 
    unique: true },

  profilePicture:
   { type: String }, 

  authProvider: 
  { type: String },

  createdAt: 
  { type: Date, 
    default: Date.now },
});

const User = mongoose.model('User', userSchema);
module.exports = User;