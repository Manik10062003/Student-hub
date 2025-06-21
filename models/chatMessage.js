// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  community: String,
  email: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Message || mongoose.model("Message", messageSchema);
