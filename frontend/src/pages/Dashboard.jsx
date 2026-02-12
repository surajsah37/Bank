

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import TransferHistory from "../components/TransferHistory";
import BalanceChart from "../components/charts/BalanceChart";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import API from "../services/api";

export default function Dashboard() {
  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  // ===============================
  // Fetch Data
  // ===============================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cardsRes = await API.get("/cards");
      const txRes = await API.get("/transactions");
      const balanceRes = await API.get("/users/balance");

      setCards(cardsRes.data);
      setTransactions(txRes.data.transactions);
      setBalance(balanceRes.data.balance);
    } catch (err) {
      console.log(err);
    }
  };

  // ===============================
  // Balance Chart Data
  // ===============================
  const balanceChartData = transactions.map((tx) => ({
    month: new Date(tx.createdAt).toLocaleString("default", {
      month: "short",
    }),
    balance:
      tx.type?.toLowerCase() === "income"
        ? Number(tx.amount)
        : -Number(tx.amount),
  }));

  // ===============================
  // Income vs Expense
  // ===============================
  const totalIncome = transactions
    .filter((t) =>
      ["income", "credit"].includes(t.type?.trim().toLowerCase())
    )
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) =>
      ["expense", "debit"].includes(t.type?.trim().toLowerCase())
    )
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const incomeExpenseData = [
    {
      name: "Money",
      income: totalIncome,
      expense: totalExpense,
    },
  ];

  return (
    // 🔥 IMPROVED MAIN CONTAINER CONTRAST
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">

        <Navbar />

        {/* ================= Cards ================= */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            My Cards
          </h2>

          <div className="flex gap-6 flex-wrap">
            {cards.map((card) => (
              <Card
                key={card._id}
                balance={card.balance}
                number={`**** ${card.cardNumber.slice(-4)}`}
                color="blue"
              />
            ))}
          </div>
        </div>

        {/* ================= Charts ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Balance Overview
            </h3>
            <BalanceChart data={balanceChartData} />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Income vs Expense
            </h3>
            <IncomeExpenseChart data={incomeExpenseData} />
          </div>

        </div>

        {/* ================= Transactions ================= */}
        <TransferHistory transfers={transactions} />

      </div>
    </div>
  );
}



