// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Cards() {
//   const [cards, setCards] = useState([]);
//   const token = localStorage.getItem("adminToken");

//   useEffect(() => {
//     const fetchCards = async () => {
//       const res = await axios.get(
//         "http://localhost:5000/api/admin/cards",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setCards(res.data);
//     };

//     fetchCards();
//   }, []);

//   const deleteCard = async (id) => {
//     await axios.delete(
//       `http://localhost:5000/api/admin/card/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     setCards(cards.filter((c) => c._id !== id));
//   };

//   return (
//     <div>
//       <h2>Cards</h2>

//       {cards.map((c) => (
//         <div key={c._id}>
//           {c.cardNumber}
//           <button onClick={() => deleteCard(c._id)}>
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
