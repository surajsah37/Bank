import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/admin/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUsers(users.filter((u) => u._id !== id));
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Users</h2>

      {users.map((u) => (
        <div key={u._id}>
          {u.email}
          <button onClick={() => deleteUser(u._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
