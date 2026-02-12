
// import { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import API from "../services/api";

// export default function BalancePage() {
//   const [balance, setBalance] = useState(0);

//   useEffect(() => {
//     fetchBalance();
//   }, []);

//   const fetchBalance = async () => {
//     try {
//       const res = await API.get("/users/balance");
//       setBalance(res.data.balance);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
//       <Sidebar />

//       <div className="flex-1 p-8 space-y-8">
//         <Navbar />

//         {/* Main Container */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 transition-colors duration-300">

//           {/* Title */}
//           <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-10">
//             Account Balance Details
//           </h2>

//           {/* Balance Card */}
//           <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 border border-gray-200 dark:border-gray-600">

//             <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
//               Current Balance
//             </p>

//             <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
//               ₹ {Number(balance).toLocaleString("en-IN")}
//             </h1>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function BalancePage() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await API.get("/users/balance");
      setBalance(res.data.balance);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">

        {/* Navbar */}
        <Navbar />

        {/* Balance Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-xl transition-colors duration-300">

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Account Balance Details
          </h2>

          {/* Compact Balance Card */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">

            <p className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
              Current Balance
            </p>

            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              ₹ {Number(balance).toLocaleString("en-IN")}
            </h1>

          </div>

        </div>

      </div>
    </div>
  );
}
