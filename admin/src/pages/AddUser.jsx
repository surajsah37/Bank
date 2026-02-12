
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users", {
        name,
        email,
        balance,
      });

      setMessage("success");
      setName("");
      setEmail("");
      setBalance("");
    } catch (error) {
      setMessage("error");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      <Sidebar />

      <div className="flex-1 p-6 space-y-6">

        <Navbar />

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition-colors duration-300 max-w-xl">

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Add New User
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 
                         text-gray-800 dark:text-white 
                         p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 
                         text-gray-800 dark:text-white 
                         p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Initial Balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 
                         text-gray-800 dark:text-white 
                         p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Add User
            </button>

          </form>

          {message === "success" && (
            <p className="mt-4 text-green-600 dark:text-green-400 text-sm">
              ✅ User added successfully
            </p>
          )}

          {message === "error" && (
            <p className="mt-4 text-red-600 dark:text-red-400 text-sm">
              ❌ Error adding user
            </p>
          )}

        </div>

      </div>
    </div>
  );
}
