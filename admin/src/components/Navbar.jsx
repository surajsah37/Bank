
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Remove token
    localStorage.removeItem("adminToken");

    // ✅ Redirect to login
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">

      <h2 className="text-lg font-semibold">
        Banking Admin
      </h2>

      <div className="flex items-center gap-3">
        <span className="text-sm">Admin</span>

        <img
          src="https://i.pravatar.cc/40"
          className="w-9 h-9 rounded-full"
          alt="admin"
        />

        {/* ✅ Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>

    </div>
  );
}
