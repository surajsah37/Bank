import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function BalanceChart({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm animate-fade-in transition-all">

      <h2 className="font-bold mb-4 text-gray-800 dark:text-gray-100">
        Balance Overview
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          
          <XAxis
            dataKey="month"
            stroke="#9ca3af"
          />

          <YAxis stroke="#9ca3af" />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderRadius: "8px",
              border: "none",
              color: "#fff"
            }}
          />

          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
