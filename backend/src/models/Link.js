import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  name: { type: String }, // <-- ✅ Add this
  originalUrl: { type: String, required: true },
  shortCode: { type: String, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  clickCount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Link", linkSchema);
