// src/api/index.js
import axios from "axios";

const API = "http://localhost:5000/api"; // Change this in production

const token = localStorage.getItem("token");

export async function createShortLink(payload) {
  const res = await fetch(`${API}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export const getUserLinks = async () => {
  const res = await axios.get(`${API}/links`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteLink = async (id) => {
  const res = await axios.delete(`${API}/links/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
