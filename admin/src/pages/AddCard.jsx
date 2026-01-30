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

  // Fetch users for dropdown
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
        balance,
      });

      setMessage("✅ Card added successfully");
      setUserId("");
      setCardNumber("");
      setBalance("");
    } catch (error) {
      setMessage("❌ Error adding card");
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
            Add Card
          </h2>

          <form onSubmit={handleSubmit}>
            {/* User Select */}
            <select
              className="w-full border p-2 mb-3 rounded"
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
              className="w-full border p-2 mb-3 rounded"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />

            <select
              className="w-full border p-2 mb-3 rounded"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
            >
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>

            <input
              type="number"
              placeholder="Balance"
              className="w-full border p-2 mb-3 rounded"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
            />

            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Card
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
