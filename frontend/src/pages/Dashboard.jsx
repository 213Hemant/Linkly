// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserLinks, createShortLink, deleteLink } from "../api";
import Analytics from "../components/Analytics";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const navigate = useNavigate();

  // If not logged in, redirect
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchLinks();
    }
  }, [navigate]);

  async function fetchLinks() {
    const data = await getUserLinks();
    setLinks(data);
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!originalUrl.trim()) return;
    await createShortLink(originalUrl);
    setOriginalUrl("");
    fetchLinks();
  }

  async function handleDelete(id) {
    await deleteLink(id);
    fetchLinks();
  }

  // ← Logout handler
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        
        {/* <Analytics links={links} /> */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleCreate} className="flex space-x-2 mb-6">
        <input
          type="url"
          placeholder="Enter a long URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="flex-grow border px-3 py-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Shorten
        </button>
      </form>

      <ul className="space-y-3">
        {links.map((link) => (
          <li
            key={link._id}
            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
          >
            <div>
              <p className="text-sm text-gray-700">{link.originalUrl}</p>
              <a
                href={`http://localhost:5000/api/links/r/${link.shortCode}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm underline"
              >
                http://localhost:5000/api/links/r/{link.shortCode}
              </a>
            </div>
            <button
              onClick={() => handleDelete(link._id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      Analytics section
      <Analytics links={links} />
    </div>
  );
}
