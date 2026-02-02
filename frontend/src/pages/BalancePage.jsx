import { useEffect, useState } from "react";
import API from "../services/api";

export default function BalancePage() {

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    const res = await API.get("/users/balance");
    setBalance(res.data.balance);
  };

  return (
    <div className="p-10">

      <h2 className="text-2xl font-bold mb-6">Account Balance Details</h2>

      <div className="bg-pink-500 text-white p-10 rounded-xl text-center w-96">
        <h3 className="text-lg">Current Balance</h3>
        <h1 className="text-4xl font-bold mt-3">₹ {balance}</h1>
      </div>

    </div>
  );
}
