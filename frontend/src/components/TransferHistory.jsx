
import React from "react";

export default function TransferHistory({ transfers }) {
  if (!transfers || transfers.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-colors duration-300">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Transaction History
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          No transactions available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-colors duration-300">
      
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Transaction History
      </h3>

      <div className="space-y-4">
        {transfers.map((tx) => {
          const isIncome =
            tx.type?.toLowerCase() === "income" ||
            tx.type?.toLowerCase() === "credit";

          return (
            <div
              key={tx._id}
              className="flex justify-between items-center p-4 rounded-xl
                         bg-gray-50 dark:bg-gray-700
                         hover:bg-gray-100 dark:hover:bg-gray-600
                         transition duration-200"
            >
              {/* Left Side */}
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {tx.description || "No Description"}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Right Side */}
              <div className="text-right">
                <p
                  className={`font-semibold text-lg ${
                    isIncome
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isIncome ? "+" : "-"}₹{Number(tx.amount).toLocaleString()}
                </p>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    isIncome
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {tx.type}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}










