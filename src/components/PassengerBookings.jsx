import { useEffect, useState } from "react";
import axios from "axios";

export default function PassengerBookings({ token }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("https://flightdeck360-backend.onrender.com/mybookings", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setBookings(res.data));
  }, [token]);

  return (
    <div className="container mt-4">
      <h3>My Bookings</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Flight</th><th>From</th><th>To</th><th>Date</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td>{b.flightNumber}</td>
              <td>{b.from}</td>
              <td>{b.to}</td>
              <td>{new Date(b.journeyDate).toLocaleString()}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
