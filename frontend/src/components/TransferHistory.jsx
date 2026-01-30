export default function TransferHistory({ transfers }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
      <h2 className="font-bold mb-4">Transaction History</h2>

      {transfers.map((t) => (
        <div
          key={t._id}
          className="flex justify-between border-b py-2 text-sm"
        >
          <span>{t.description || "Transaction"}</span>
          <span
            className={
              t.type === "income"
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {t.type === "income" ? "+" : "-"}₹{t.amount}
          </span>
        </div>
      ))}
    </div>
  );
}
