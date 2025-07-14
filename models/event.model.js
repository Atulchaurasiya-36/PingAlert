import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",               
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  reminderTime: {
    type: Date,
    required: true
  },
  sendEmail: {
    type: Boolean,
    default: true
  },
  sendSMS: {
    type: Boolean,
    default: false
  },
  reminderSent: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
