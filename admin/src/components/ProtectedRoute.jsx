import { Navigate } from "react-router-dom";
import { getRoleFromToken } from "../utils/getRole";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) return <Navigate to="/login" />;

  const role = getRoleFromToken(token);
  if (role !== "admin") return <Navigate to="/login" />;

  return children;
}
