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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersRes = await API.get("/users");
      const cardsRes = await API.get("/cards");
      const txRes = await API.get("/transactions");

      setUsers(usersRes.data);
      setCards(cardsRes.data);
      setTransactions(txRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Prepare chart data
  const balanceChartData = transactions.map((tx) => ({
    month: new Date(tx.createdAt).toLocaleString("default", {
      month: "short",
    }),
    balance: tx.type === "income" ? tx.amount : -tx.amount,
  }));

  const incomeExpenseData = [
    {
      name: "Income",
      value: transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    },
    {
      name: "Expense",
      value: transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6 text-gray-800 dark:text-gray-100">
        <Navbar />

        {/* Cards */}
        <div>
          <h2 className="text-xl font-bold mb-4">My Cards</h2>
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

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BalanceChart data={balanceChartData} />
          <IncomeExpenseChart data={incomeExpenseData} />
        </div>

        {/* Transactions */}
        <TransferHistory transfers={transactions} />
      </div>
    </div>
  );
}
