import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function BookingForm() {
  const { id } = useParams(); // flight ID from URL
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [form, setForm] = useState({
    passengerName: "",
    contact: "",
    totalPassengers: 1,
    assistanceRequired: false
  });

  const token = localStorage.getItem("token");

  // fetch selected flight details
  useEffect(() => {
    axios.get(`http://localhost:5001/flights/${id}`)
      .then(res => setFlight(res.data))
      .catch(() => alert("Failed to load flight details"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5001/bookings",
        {
          ...form,
          flightNumber: flight.flightNumber,
          flightName: flight.flightName,
          from: flight.from,
          to: flight.to,
          journeyDate: flight.journeyDateTime
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Booking successful ✅");
      navigate("/mybookings");
    } catch (err) {
      alert("Booking failed ❌");
    }
  };

  if (!flight) return <p className="text-center mt-4">Loading flight details...</p>;

  return (
    <div className="container mt-4">
      <h3>Book Flight Ticket</h3>

      {/* Flight Details Card */}
      <div className="card mb-3">
        <div className="card-body">
          <h5>{flight.flightName} ({flight.flightNumber})</h5>
          <p><strong>From:</strong> {flight.from} → <strong>To:</strong> {flight.to}</p>
          <p><strong>Date:</strong> {new Date(flight.journeyDateTime).toLocaleString()}</p>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="border p-3 rounded">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Passenger Name"
          value={form.passengerName}
          onChange={(e) => setForm({ ...form, passengerName: e.target.value })}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Contact Number"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          required
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Total Passengers"
          value={form.totalPassengers}
          min="1"
          onChange={(e) => setForm({ ...form, totalPassengers: e.target.value })}
          required
        />
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={form.assistanceRequired}
            onChange={(e) => setForm({ ...form, assistanceRequired: e.target.checked })}
          />
          <label className="form-check-label">Need Assistance?</label>
        </div>
        <button className="btn btn-primary w-100">Book Ticket</button>
      </form>
    </div>
  );
}
