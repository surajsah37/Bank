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
      const res = await API.post("/users", {
        name,
        email,
        balance,
      });

      setMessage("✅ User added successfully");
      setName("");
      setEmail("");
      setBalance("");

      console.log(res.data); // saved user
    } catch (error) {
      setMessage("❌ Error adding user");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <Navbar />

        <div className="bg-white p-6 rounded-xl shadow max-w-xl">
          <h2 className="text-xl font-bold mb-4">
            Add New User
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="User Name"
              className="w-full border p-2 mb-3 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 mb-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Initial Balance"
              className="w-full border p-2 mb-3 rounded"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
          </form>

          {message && (
            <p className="mt-3 text-sm">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
