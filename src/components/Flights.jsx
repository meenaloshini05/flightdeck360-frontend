import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Flights({ role }) {
  const [flights, setFlights] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Fetch all flights once
  useEffect(() => {
    axios.get("http://localhost:5001/flights")
      .then((res) => {
        setFlights(res.data);
        setFiltered(res.data); // show all initially
      })
      .catch(() => alert("Failed to load flights"));
  }, []);

  // Run filter whenever search or flights change
  useEffect(() => {
    const result = flights.filter(f =>
      f.from.toLowerCase().includes(search.toLowerCase()) ||
      f.to.toLowerCase().includes(search.toLowerCase()) ||
      f.flightNumber.toLowerCase().includes(search.toLowerCase()) ||
      f.flightName.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, flights]);

  return (
    <div className="container mt-4">
      <h3>Available Flights</h3>
      <input
        className="form-control mb-3"
        placeholder="Search by flight number, name, source, or destination"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="text-muted">No flights found</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>From</th>
              <th>To</th>
              <th>Journey Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f._id}>
                <td>{f.flightNumber}</td>
                <td>{f.flightName}</td>
                <td>{f.from}</td>
                <td>{f.to}</td>
                <td>{new Date(f.journeyDateTime).toLocaleString()}</td>
                <td>
                  {role === "passenger" && (
                    <Link
                      to={`/bookings/${f._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Book
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
