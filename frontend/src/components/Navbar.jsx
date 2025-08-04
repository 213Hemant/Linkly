import React from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Linkly
      </Link>
      <div className="space-x-4">
        <Link to="/login"   className="text-sm text-gray-700 hover:underline">Login</Link>
        <Link to="/register" className="text-sm text-gray-700 hover:underline">Register</Link>
        <Link to="/dashboard" className="text-sm text-gray-700 hover:underline">Dashboard</Link>
      </div>
    </nav>
  );
}
