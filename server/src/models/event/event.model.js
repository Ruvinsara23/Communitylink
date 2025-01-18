// models/Event.js
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, maxlength: 5000 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String },
  coverImage: { type: String }, // Store URL or base64 string
  link: { type: String },
  host: { type: String },
  pricing: { type: String },
  chatGroup: { type: String },
  communityId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Community", // Reference to the Community model
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);
