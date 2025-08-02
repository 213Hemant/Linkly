// backend/src/controllers/linkController.js

import Link from "../models/Link.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 8);

// Create
export const createLink = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: "originalUrl is required" });

  let shortCode, exists;
  do {
    shortCode = nanoid();
    exists = await Link.findOne({ shortCode });
  } while (exists);

  const link = new Link({ originalUrl, shortCode, owner: req.userId });
  await link.save();
  res.status(201).json(link);
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
