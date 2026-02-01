import { useEffect, useState } from "react";
import API from "../services/api";

export default function ViewCards() {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    const res = await API.get("/cards");
    setCards(res.data);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const deleteCard = async (id) => {
    if (!window.confirm("Delete this card?")) return;

    await API.delete(`/cards/${id}`);

    fetchCards();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Cards</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Card Number</th>
            <th className="p-2">Balance</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {cards.map((c) => (
            <tr key={c._id} className="border-t">
              <td className="p-2">{c.cardNumber}</td>
              <td className="p-2">₹ {c.balance}</td>

              <td className="p-2">
                <button
                  onClick={() => deleteCard(c._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
