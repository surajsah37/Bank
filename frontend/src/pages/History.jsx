
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data.transactions);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // ✅ FILTER LOGIC (TEXT + DATE RANGE)
  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.createdAt);
    const start = fromDate ? new Date(fromDate) : null;
    const end = toDate ? new Date(toDate) : null;

    // TEXT FILTER
    const matchesSearch =
      tx.description?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      tx.type?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      tx.amount?.toString().includes(debouncedSearch);

    // DATE FILTER
    const matchesFrom = start ? txDate >= start : true;
    const matchesTo = end ? txDate <= end : true;

    return matchesSearch && matchesFrom && matchesTo;
  });

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <Navbar />

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transition-all duration-300">

          {/* HEADER + FILTERS */}
          <div className="flex flex-col gap-6 mb-8">

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Transaction History
            </h2>

            {/* FILTER ROW */}
            <div className="flex flex-col md:flex-row gap-4 md:items-center">

              {/* 🔍 Search */}
              <div className="relative w-full md:w-80">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search description, amount..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl
                    bg-gray-100 dark:bg-gray-700
                    text-gray-800 dark:text-white
                    border border-gray-300 dark:border-gray-600
                    focus:outline-none
                    focus:ring-2 focus:ring-blue-500
                    transition-all duration-300"
                />
              </div>

              {/* 📅 FROM DATE */}
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-4 py-2 rounded-xl
                  bg-gray-100 dark:bg-gray-700
                  text-gray-800 dark:text-white
                  border border-gray-300 dark:border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition-all duration-300"
              />

              {/* 📅 TO DATE */}
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-4 py-2 rounded-xl
                  bg-gray-100 dark:bg-gray-700
                  text-gray-800 dark:text-white
                  border border-gray-300 dark:border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition-all duration-300"
              />

              {/* 🔄 Clear Button */}
              <button
                onClick={() => {
                  setSearch("");
                  setFromDate("");
                  setToDate("");
                }}
                className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
              >
                Clear
              </button>

            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full text-left">

              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold">Description</th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>

                    <td
                      className={`p-4 font-semibold ${
                        tx.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {tx.type}
                    </td>

                    <td className="p-4 font-medium text-gray-800 dark:text-gray-200">
                      ₹{Number(tx.amount).toLocaleString("en-IN")}
                    </td>

                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {tx.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* EMPTY STATE */}
            {filteredTransactions.length === 0 && (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                No transactions found for selected filters.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
