import Link from "../models/Link.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 8);

// 1. Create a short link
export const createLink = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: "originalUrl is required" });

  // generate unique code
  let shortCode;
  let exists;
  do {
    shortCode = nanoid();
    exists = await Link.findOne({ shortCode });
  } while (exists);

  const link = new Link({
    originalUrl,
    shortCode,
    owner: req.userId
  });

  await link.save();
  res.status(201).json(link);
};

// 2. Get all links for this user
export const getLinks = async (req, res) => {
  const links = await Link.find({ owner: req.userId }).sort({ createdAt: -1 });
  res.json(links);
};

// 3. Delete a link by its ID
export const deleteLink = async (req, res) => {
  const { id } = req.params;
  const link = await Link.findOneAndDelete({ _id: id, owner: req.userId });
  if (!link) return res.status(404).json({ error: "Link not found" });
  res.json({ message: "Link deleted" });
};

// 4. Redirect via shortCode (public)
export const redirectToUrl = async (req, res) => {
  const { code } = req.params;
  const link = await Link.findOne({ shortCode: code });
  if (!link) return res.status(404).json({ error: "Link not found" });

  link.clickCount += 1;
  await link.save();

  return res.redirect(link.originalUrl);
};
