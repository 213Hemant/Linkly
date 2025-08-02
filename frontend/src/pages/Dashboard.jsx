import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
      
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

      {/* Dashboard contents will go here in Phase 5 */}
      <p className="mt-4 text-gray-600">Welcome! This page will soon show your short links and analytics.</p>
    </div>
  );
}
