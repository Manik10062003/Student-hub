import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  college: String,
  branch: String,
  specialization: String,
  passingYear: String,
  email: { type: String, unique: true },
  password: String, // hash this!
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
