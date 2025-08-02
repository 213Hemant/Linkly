import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode:   { type: String, required: true, unique: true },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clickCount:  { type: Number, default: 0 },
  createdAt:   { type: Date, default: Date.now }
});

export default mongoose.model("Link", linkSchema);
