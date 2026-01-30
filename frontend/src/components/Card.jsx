export default function Card({ balance, number, color }) {
  const bg =
    color === "pink"
      ? "bg-pink-500"
      : "bg-pink-500";

  return (
    <div
      className={`${bg} text-white rounded-xl p-5 w-64
      transform transition duration-300 hover:scale-105`}
    >
      <p className="text-sm">Total Balance</p>
      <h2 className="text-2xl font-bold">${balance}</h2>
      <p className="mt-6">{number}</p>
    </div>
  );
}
