import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("userToken");

        const res = await axios.get(
          "http://localhost:5000/api/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactions(res.data.transactions);
      } catch (err) {
        setError("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <p className="p-6 text-white">Loading...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">
        Transaction History
      </h1>

      {transactions.length === 0 ? (
        <p className="text-gray-400">No transactions found.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Date</th>
              <th className="py-2">Type</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx._id}
                className="border-b border-gray-800"
              >
                <td className="py-2">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>
                <td
                  className={
                    tx.type === "credit"
                      ? "text-red-400"
                      : "text-green-400"
                  }
                >
                  {tx.type}
                </td>
                <td>₹{tx.amount}</td>
                <td>{tx.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}












  