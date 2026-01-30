import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-6 space-y-6">

        <Navbar />

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-2xl font-bold">120</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Cards</p>
            <h2 className="text-2xl font-bold">85</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Transactions</p>
            <h2 className="text-2xl font-bold">1,540</h2>
          </div>

        </div>

      </div>
    </div>
  );
}
