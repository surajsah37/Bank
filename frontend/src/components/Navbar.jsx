import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { getRoleFromToken } from "../utils/getRole";


export default function Navbar() {
  const navigate = useNavigate();
  const { dark, setDark } = useContext(ThemeContext);

  const token = localStorage.getItem("userToken");
  const role = getRoleFromToken(token);

  const logout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow">

      {/* Left */}
      <div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-gray-400">
          Welcome back 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* 🌙 Dark mode */}
        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
        >
          {dark ? "🌙" : "☀️"}
        </button>

        {/* 👑 ADMIN ONLY BUTTON */}
        {role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Admin Panel
          </button>
        )}

        {/* Profile */}
        <img
          src="https://i.pravatar.cc/40"
          className="w-9 h-9 rounded-full"
        />

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>

      </div>
    </div>
  );
}
