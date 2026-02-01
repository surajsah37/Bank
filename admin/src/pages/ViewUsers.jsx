import { useEffect, useState } from "react";
import API from "../services/api";

export default function ViewUsers() {
  const [users, setUsers] = useState([]);

  // fetch users
  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await API.delete(`/users/${id}`);

    fetchUsers(); // refresh
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Users</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Email</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.email}</td>

              <td className="p-2">
                <button
                  onClick={() => deleteUser(u._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
