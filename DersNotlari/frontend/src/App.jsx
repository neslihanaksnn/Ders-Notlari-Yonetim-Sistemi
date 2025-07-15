import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import NoteDetail from "./pages/NoteDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/notlarim" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        <Route path="/notlarim/:id" element={
          <PrivateRoute>
            <NoteDetail />
          </PrivateRoute>
        } />
        
        <Route path="/" element={
          <Navigate to="/notlarim" replace />
        } />
        
        <Route path="*" element={
          <Navigate to="/notlarim" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;