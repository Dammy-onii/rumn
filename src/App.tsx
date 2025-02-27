import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router";
import OTP from "./pages/OTP";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
