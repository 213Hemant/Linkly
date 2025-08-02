import express from "express";
import {
  createLink,
  getLinks,
  deleteLink,
  redirectToUrl,
} from "../controllers/linkcontroller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Authenticated routes
router.post("/", auth, createLink);
router.get("/", auth, getLinks);
router.delete("/:id", auth, deleteLink);

// Public redirect route — NO auth
router.get("/r/:code", redirectToUrl);

export default router;
