// import { NavLink } from "react-router-dom";

// export default function Sidebar() {

//   const baseClass = "hover:text-blue-400 block";
//   const activeClass = "text-blue-400 font-semibold block";

//   return (
//     <div className="w-64 min-h-screen bg-gray-900 text-white p-6">

//       <h1 className="text-2xl font-bold mb-10">
//         Admin Panel
//       </h1>

//       <ul className="space-y-4">

//         <li>
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive ? activeClass : baseClass
//             }
//           >
//             Dashboard
//           </NavLink>
//         </li>

//         <li>
//           <NavLink
//             to="/add-user"
//             className={({ isActive }) =>
//               isActive ? activeClass : baseClass
//             }
//           >
//             Add User
//           </NavLink>
//         </li>

//         <li>
//           <NavLink
//             to="/add-card"
//             className={({ isActive }) =>
//               isActive ? activeClass : baseClass
//             }
//           >
//             Add Card
//           </NavLink>
//         </li>

//         <li>
//           <NavLink
//             to="/add-transaction"
//             className={({ isActive }) =>
//               isActive ? activeClass : baseClass
//             }
//           >
//             Add Transaction
//           </NavLink>
//         </li>

//         {/* NEW PAGES FOR DELETE */}
//         <li className="pt-4 border-t border-gray-700">
//           <NavLink
//             to="/users"
//             className={({ isActive }) =>
//               isActive ? activeClass : baseClass
//             }
//           >
//             View Users
//           </NavLink>
//         </li>

//         <li>
//           <NavLink
//             to="/cards"
//             className={({ isActive }) =>
//               isActive ? activeClass : baseClass
//             }
//           >
//             View Cards
//           </NavLink>
//         </li>

//       </ul>
//     </div>
//   );
// }












import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const baseClass =
    "block px-3 py-2 rounded-lg transition hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400";

  const activeClass =
    "block px-3 py-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-gray-800 dark:text-blue-400 font-semibold";

  return (
    <div className="w-64 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 shadow-md transition-colors duration-300">

      <h1 className="text-2xl font-bold mb-10">
        Admin Panel
      </h1>

      <ul className="space-y-3">

        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClass : baseClass
            }
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/add-user"
            className={({ isActive }) =>
              isActive ? activeClass : baseClass
            }
          >
            Add User
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/add-card"
            className={({ isActive }) =>
              isActive ? activeClass : baseClass
            }
          >
            Add Card
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/add-transaction"
            className={({ isActive }) =>
              isActive ? activeClass : baseClass
            }
          >
            Add Transaction
          </NavLink>
        </li>

        <li className="pt-4 border-t border-gray-300 dark:border-gray-700">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? activeClass : baseClass
            }
          >
            View Users
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/cards"
            className={({ isActive }) =>
              isActive ? activeClass : baseClass
            }
          >
            View Cards
          </NavLink>
        </li>

      </ul>
    </div>
  );
}
