import express from "express";
import {
  createLink,
  getLinks,
  deleteLink,
  redirectToUrl
} from "../controllers/linkcontroller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Protected routes—require JWT
router.post("/", auth, createLink);
router.get("/",  auth, getLinks);
router.delete("/:id", auth, deleteLink);

// Public redirect route
router.get("/r/:code", redirectToUrl);

export default router;
