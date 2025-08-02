// backend/src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import { auth } from "./middleware/auth.js"; // 👈 import your auth middleware

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Public test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Linkly backend is working!" });
});

// ✅ Protected test route (use JWT token here)
app.get("/api/protected", auth, (req, res) => {
  res.json({
    message: "You are authenticated",
    userId: req.userId
  });
});

// // ✅ Protected test route (use JWT token here)
// app.get("/api/protected", (req, res) => { // <-- removed the "auth" middleware
//   console.log("Authorization header:", req.headers.authorization); // <-- Add this line
//   res.json({
//     message: "You are authenticated",
//     userId: req.userId
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
