import { Navigate } from "react-router-dom";
import { getRoleFromToken } from "../utils/getRole";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const role = getRoleFromToken(token);

  // 🔴 IMPORTANT
  if (role !== "user") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
