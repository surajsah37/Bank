import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login"; 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
          
        <Route path="/login" element={<Login />} />



        {/* Default route */}
        <Route
          path="/"
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Transactions */}
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;