// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserLinks, createShortLink, deleteLink } from "../api";
import Analytics from "../components/Analytics";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [linkName, setLinkName] = useState("");
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchLinks();
    }
  }, [navigate]);

  // Fetch user's links
  async function fetchLinks() {
    try {
      const data = await getUserLinks();
      setLinks(data);
    } catch (err) {
      console.error("Failed to fetch links:", err);
    }
  }

  // Handle creation of a new short link
  async function handleCreate(e) {
    e.preventDefault();
    if (!originalUrl.trim()) return;

    try {
      await createShortLink({
        originalUrl: originalUrl.trim(),
        name: linkName.trim() || undefined,
      });
      setOriginalUrl("");
      setLinkName("");
      fetchLinks();
    } catch (err) {
      console.error("Failed to create link:", err);
    }
  }

  // Handle link deletion
  async function handleDelete(id) {
    try {
      await deleteLink(id);
      fetchLinks();
    } catch (err) {
      console.error("Failed to delete link:", err);
    }
  }

  // Logout handler
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Create Link Form */}
      <form onSubmit={handleCreate} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Optional name for your link"
          value={linkName}
          onChange={(e) => setLinkName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="url"
          placeholder="Enter a long URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Shorten
        </button>
      </form>

      {/* Links List */}
      <ul className="space-y-3 mb-6">
        {links.length > 0 ? (
          links.map((link) => (
            <li
              key={link._id}
              className="bg-gray-100 p-4 rounded flex justify-between items-start"
            >
              <div className="flex-1">
                {/* Display the optional name */}
                {link.name && (
                  <p className="text-lg font-semibold mb-1">{link.name}</p>
                )}
                <p className="text-sm text-gray-700 mb-1">{link.originalUrl}</p>
                <a
                  href={`http://localhost:5000/api/links/r/${link.shortCode}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  http://localhost:5000/api/links/r/{link.shortCode}
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  Clicked <strong>{link.clickCount}</strong> times
                </p>
              </div>
              <button
                onClick={() => handleDelete(link._id)}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-600">You haven’t created any links yet.</p>
        )}
      </ul>

      {/* Analytics Section */}
      <Analytics links={links} />
    </div>
  );
}
