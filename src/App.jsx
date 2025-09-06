import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Flights from "./components/Flights";
import BookingForm from "./components/BookingForm";
import BookedTickets from './components/BookedTickets';
import PassengerBookings from "./components/PassengerBookings";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const setAuth = (t, r) => {
    setToken(t);
    setRole(r);
    localStorage.setItem("token", t);
    localStorage.setItem("role", r);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.clear();
  };

  return (
    <>
      <Navbar token={token} role={role} onLogout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flights" element={<Flights role={role} />} />
        <Route path="/bookings/:id" element={<BookingForm token={token} />} />
        <Route path="/mybookings" element={<PassengerBookings token={token} />} />
        <Route path="/bookedflights" element={<BookedTickets token={token} />} />
        <Route path="/dashboard" element={<AdminDashboard token={token} />} />
      </Routes>
    </>
  );
}
