
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function AddCard() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("debit");
  const [balance, setBalance] = useState("");
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
      await API.post("/cards", {
        userId,
        cardNumber,
        cardType,
        balance
      });

      setMessage("success");
      setUserId("");
      setCardNumber("");
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

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-xl transition-colors duration-300">

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Add Card
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <select
              className="w-full border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 
                         text-gray-800 dark:text-white 
                         p-2 rounded-lg"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            >
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 
                         text-gray-800 dark:text-white 
                         p-2 rounded-lg"
            />

            <select
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 
                         text-gray-800 dark:text-white 
                         p-2 rounded-lg"
            >
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>

            <input
              type="number"
              placeholder="Balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 
                         text-gray-800 dark:text-white 
                         p-2 rounded-lg"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Add Card
            </button>

          </form>

          {message === "success" && (
            <p className="mt-4 text-green-600 dark:text-green-400 text-sm">
              ✅ Card added successfully
            </p>
          )}

          {message === "error" && (
            <p className="mt-4 text-red-600 dark:text-red-400 text-sm">
              ❌ Error adding card
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
