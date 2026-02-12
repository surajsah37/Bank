// import { useNavigate } from "react-router-dom";
// export default function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // ✅ Remove token
//     localStorage.removeItem("adminToken");

//     // ✅ Redirect to login
//     navigate("/login");
//   };

//   return (
//     <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">

//       <h2 className="text-lg font-semibold">
//         Banking Admin
//       </h2>

//       <div className="flex items-center gap-3">
//         <span className="text-sm">Admin</span>

//         <img
//           src="https://i.pravatar.cc/40"
//           className="w-9 h-9 rounded-full"
//           alt="admin"
//         />

//         {/* ✅ Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>

//     </div>
//   );
// }









import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow">

      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        Banking Admin
      </h2>

      <div className="flex items-center gap-4">

        {/* 🌙 Toggle Button */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <span className="text-sm text-gray-700 dark:text-gray-200">
          Admin
        </span>

        <img
          src="https://i.pravatar.cc/40"
          className="w-9 h-9 rounded-full"
          alt="admin"
        />

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

    </div>
  );
}
