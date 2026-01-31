import { NavLink } from "react-router-dom";
import { getRoleFromToken } from "../utils/getRole";

export default function Sidebar() {
  const token = localStorage.getItem("userToken");
  const role = getRoleFromToken(token);

  const linkClass =
    "block px-4 py-2 rounded text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700";

  const activeClass =
    "block px-4 py-2 rounded bg-blue-500 text-white";

  return (
    <div className="w-64 min-h-screen bg-white dark:bg-gray-900 p-6 shadow">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        BankApp
      </h1>

      {/* Navigation */}
      <nav className="space-y-2">

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? activeClass : linkClass
          }
        >
          Dashboard
        </NavLink>

        {/* Transactions */}
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? activeClass : linkClass
          }
        >
          Transactions
        </NavLink>

        {/* ADMIN ONLY */}
        {role === "admin" && (
          <>
            <p className="mt-6 mb-2 text-xs uppercase text-gray-400">
              Admin
            </p>

            <NavLink
              to="/admin/add-user"
              className={({ isActive }) =>
                isActive ? activeClass : linkClass
              }
            >
              Add User
            </NavLink>

            <NavLink
              to="/admin/add-card"
              className={({ isActive }) =>
                isActive ? activeClass : linkClass
              }
            >
              Add Card
            </NavLink>

            <NavLink
              to="/admin/add-transaction"
              className={({ isActive }) =>
                isActive ? activeClass : linkClass
              }
            >
              Add Transaction
            </NavLink>
          </>
        )}

      </nav>
    </div>
  );
}
