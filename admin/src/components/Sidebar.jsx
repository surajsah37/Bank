import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        Admin Panel
      </h1>

      <ul className="space-y-4">
        <li>
          <Link to="/" className="hover:text-blue-400">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/add-user" className="hover:text-blue-400">
            Add User
          </Link>
        </li>
        <li>
          <Link to="/add-card" className="hover:text-blue-400">
            Add Card
          </Link>
        </li>
        <li>
          <Link to="/add-transaction" className="hover:text-blue-400">
            Add Transaction
          </Link>
        </li>
      </ul>

    </div>
  );
}
