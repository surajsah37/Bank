
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

      setMessage("success");
      setUserId("");
      setAmount("");
      setDescription("");
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

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-xl transition-colors duration-300">

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Add Transaction
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 
                         text-gray-800 dark:text-white 
                         p-2 rounded-lg"
            >
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 
                         text-gray-800 dark:text-white 
                         p-2 rounded-lg"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 
                         text-gray-800 dark:text-white 
                         p-2 rounded-lg"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 
                         text-gray-800 dark:text-white 
                         p-2 rounded-lg"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Add Transaction
            </button>

          </form>

          {message === "success" && (
            <p className="mt-4 text-green-600 dark:text-green-400 text-sm">
              ✅ Transaction added successfully
            </p>
          )}

          {message === "error" && (
            <p className="mt-4 text-red-600 dark:text-red-400 text-sm">
              ❌ Error adding transaction
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
