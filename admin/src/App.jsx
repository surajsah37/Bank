
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import AddCard from "./pages/AddCard";
import AddTransaction from "./pages/AddTransaction";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewUsers from "./pages/ViewUsers";
import ViewCards from "./pages/ViewCards";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-user"
          element={
            <ProtectedRoute>
              <AddUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-card"
          element={
            <ProtectedRoute>
              <AddCard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-transaction"
          element={
            <ProtectedRoute>
              <AddTransaction />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <ViewUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cards"
          element={
            <ProtectedRoute>
              <ViewCards />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
