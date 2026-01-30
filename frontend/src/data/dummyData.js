
export const cards = [
  { id: 1, balance: 219.78, number: "**** 3783", color: "blue" },
  { id: 2, balance: 1020.50, number: "**** 9921", color: "purple" }
];

export const payments = {
  sent: 1700,
  received: 2100,
  rate: 80
};

export const transfers = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  amount: i % 2 === 0 ? +200 + i : -150 - i,
  date: "15 Jan 2025",
  type: i % 2 === 0 ? "Income" : "Expense"
}));
export const balanceChartData = [
  { month: "Jan", balance: 1200 },
  { month: "Feb", balance: 1500 },
  { month: "Mar", balance: 1800 },
  { month: "Apr", balance: 1600 },
  { month: "May", balance: 2000 },
  { month: "Jun", balance: 2300 }
];

export const incomeExpenseData = [
  { name: "Jan", income: 500, expense: 300 },
  { name: "Feb", income: 700, expense: 400 },
  { name: "Mar", income: 800, expense: 600 },
  { name: "Apr", income: 650, expense: 500 },
  { name: "May", income: 900, expense: 550 },
];