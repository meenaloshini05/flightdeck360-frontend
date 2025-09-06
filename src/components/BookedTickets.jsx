import { useEffect, useState } from "react";
import axios from "axios";

export default function BookedTickets({ token }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/bookings", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setBookings(res.data));
  }, [token]);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5001/bookings/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
  };

  return (
    <div className="container mt-4">
      <h3>Manage Bookings</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Passenger</th><th>Flight</th><th>Flight Name</th><th>Date</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td>{b.passengerName}</td>
              <td>{b.flightNumber}</td>
              <td>{b.flightName}</td>
              <td>{new Date(b.journeyDate).toLocaleString()}</td>
              <td>{b.status}</td>
              <td>
                <button className="btn btn-success btn-sm me-2" onClick={() => updateStatus(b._id, "Approved")}>Approve</button>
                <button className="btn btn-danger btn-sm" onClick={() => updateStatus(b._id, "Rejected")}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
