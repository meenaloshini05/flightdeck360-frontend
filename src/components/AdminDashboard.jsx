import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [flight, setFlight] = useState({
    flightNumber: "",
    flightName: "",
    from: "",
    to: "",
    journeyDateTime: ""
  });
  const [flights, setFlights] = useState([]);

  const token = localStorage.getItem("token");

  // fetch flights
  const fetchFlights = async () => {
    try {
      const res = await axios.get("http://localhost:5001/flights");
      setFlights(res.data);
    } catch (err) {
      alert("Failed to load flights");
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  // add flight
  const addFlight = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://flightdeck360-backend.onrender.com/flights", flight, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Flight added successfully ✅");
      setFlight({ flightNumber: "", flightName: "", from: "", to: "", journeyDateTime: "" });
      fetchFlights(); // refresh list
    } catch (err) {
      alert("Failed to add flight ❌");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Admin Dashboard</h3>

      {/* Add Flight Form */}
      <form onSubmit={addFlight} className="border p-3 rounded mb-4">
        <h5>Add New Flight</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Flight Number"
          value={flight.flightNumber}
          onChange={(e) => setFlight({ ...flight, flightNumber: e.target.value })}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Flight Name"
          value={flight.flightName}
          onChange={(e) => setFlight({ ...flight, flightName: e.target.value })}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="From"
          value={flight.from}
          onChange={(e) => setFlight({ ...flight, from: e.target.value })}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="To"
          value={flight.to}
          onChange={(e) => setFlight({ ...flight, to: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          className="form-control mb-2"
          value={flight.journeyDateTime}
          onChange={(e) => setFlight({ ...flight, journeyDateTime: e.target.value })}
          required
        />
        <button className="btn btn-success w-100">Add Flight</button>
      </form>

      {/* Show All Flights */}
      <h5>All Flights</h5>
      {flights.length === 0 ? (
        <p className="text-muted">No flights available</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>From</th>
              <th>To</th>
              <th>Journey Date</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((f) => (
              <tr key={f._id}>
                <td>{f.flightNumber}</td>
                <td>{f.flightName}</td>
                <td>{f.from}</td>
                <td>{f.to}</td>
                <td>{new Date(f.journeyDateTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
