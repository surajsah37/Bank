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
      setTransactions(txRes.data);
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
    balance: tx.type?.toLowerCase() === "income"
      ? Number(tx.amount)
      : -Number(tx.amount),
  }));


  // ===============================
  // ⭐ INCOME vs EXPENSE (FINAL FIX)
  // MUST MATCH:
  // dataKey="income"
  // dataKey="expense"
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
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-6 space-y-6">

        <Navbar />

        {/* ================= Cards ================= */}
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


        {/* ================= Charts ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BalanceChart data={balanceChartData} />
          <IncomeExpenseChart data={incomeExpenseData} />
        </div>


        {/* ================= Transactions ================= */}
        <TransferHistory transfers={transactions} />

      </div>
    </div>
  );
}
