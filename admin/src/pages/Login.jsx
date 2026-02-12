
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // ✅ Save token
      localStorage.setItem("adminToken", res.data.token);

      // ✅ Redirect to dashboard
      navigate("/");
    } catch (err) {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Secure Admin Panel Access
        </p>
      </div>
    </div>
  );
}
