// frontend/src/api.js

const API = "http://localhost:5000/api";
const token = () => localStorage.getItem("token");

// Auth
export async function registerUser(data) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

// Links
export async function getUserLinks() {
  const res = await fetch(`${API}/links`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return await res.json();
}

export async function createShortLink(originalUrl) {
  const res = await fetch(`${API}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify({ originalUrl }),
  });
  return await res.json();
}

export async function deleteLink(id) {
  const res = await fetch(`${API}/links/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return await res.json();
}
