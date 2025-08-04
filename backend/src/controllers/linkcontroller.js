// backend/src/controllers/linkController.js

import Link from "../models/Link.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 8);


// Create
export const createLink = async (req, res) => {
  // Grab whatever came in
  let { originalUrl, name } = req.body;

  // If originalUrl itself is an object, unpack it
  if (originalUrl && typeof originalUrl === "object") {
    name = originalUrl.name || name;
    originalUrl = originalUrl.originalUrl;
  }

  // Validate
  if (!originalUrl || typeof originalUrl !== "string") {
    return res
      .status(400)
      .json({ error: "originalUrl must be a non-empty string" });
  }

  try {
    // Generate unique short code
    let shortCode;
    let exists;
    do {
      shortCode = nanoid();
      exists = await Link.findOne({ shortCode });
    } while (exists);

    // Build and save
    const link = new Link({
      originalUrl: originalUrl.trim(),
      shortCode,
      name: name?.trim(),
      owner: req.userId,
    });
    await link.save();
    return res.status(201).json(link);
  } catch (err) {
    console.error("CreateLink error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get
export const getLinks = async (req, res) => {
  const links = await Link.find({ owner: req.userId }).sort({ createdAt: -1 });
  res.json(links);
};

// Delete
export const deleteLink = async (req, res) => {
  const link = await Link.findOneAndDelete({ _id: req.params.id, owner: req.userId });
  if (!link) return res.status(404).json({ error: "Link not found" });
  res.json({ message: "Link deleted" });
};

// Redirect (public)
export const redirectToUrl = async (req, res) => {
  const link = await Link.findOne({ shortCode: req.params.code });
  if (!link) return res.status(404).json({ error: "Link not found" });
  link.clickCount++;
  await link.save();
  res.redirect(link.originalUrl);
};
