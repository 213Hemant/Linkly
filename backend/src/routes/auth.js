// backend/src/routes/auth.js
import express from "express";
import { register, login } from "../controllers/authController.js"; // 👈 match the file name exactly

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
