import { Navigate } from "react-router-dom";
import { getRoleFromToken } from "../utils/getRole";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("userToken");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const role = getRoleFromToken(token);

  // Only USER allowed (not admin)
  if (role !== "user") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
