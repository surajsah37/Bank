
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6 transition-colors duration-300">

      <Navbar />

      <div className="mt-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors duration-300">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            All Users
          </h2>

          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
            Total: {filteredUsers.length}
          </span>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 
                       text-gray-800 dark:text-white 
                       p-2 rounded-lg"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading users...
          </p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No matching users found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                  <th className="p-3 text-gray-800 dark:text-white">#</th>
                  <th className="p-3 text-gray-800 dark:text-white">Email</th>
                  <th className="p-3 text-center text-gray-800 dark:text-white">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 dark:border-gray-700 
                               hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-3 text-gray-700 dark:text-gray-200">
                      {index + 1}
                    </td>

                    <td className="p-3 font-medium text-gray-800 dark:text-white">
                      {user.email}
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}
