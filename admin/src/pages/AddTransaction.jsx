import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function AddTransaction() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await API.get("/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/transactions", {
        userId,
        amount,
        type,
        description,
      });

      setMessage("✅ Transaction added successfully");
      setUserId("");
      setAmount("");
      setDescription("");
    } catch (error) {
      setMessage("❌ Error adding transaction");
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
            Add Transaction
          </h2>

          <form onSubmit={handleSubmit}>
            {/* User */}
            <select
              className="w-full border p-2 mb-3 rounded"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            >
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>

            {/* Amount */}
            <input
              type="number"
              placeholder="Amount"
              className="w-full border p-2 mb-3 rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            {/* Type */}
            <select
              className="w-full border p-2 mb-3 rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* Description */}
            <input
              type="text"
              placeholder="Description"
              className="w-full border p-2 mb-3 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Transaction
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
