import { Link } from "react-router-dom";

export default function Navbar({ token, role, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">FlightDeck360</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navContent">
        <ul className="navbar-nav ms-auto">
          {!token ? (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/flights">Flights</Link></li>
              {role === "passenger" && (
                <>
                <li className="nav-item"><Link className="nav-link" to="/mybookings">My Bookings</Link></li>
              
               </>  
               ) }
              {role === "admin" && (
                <>
                <li className="nav-item"><Link className="nav-link" to="/bookedflights">Booked Flight</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/dashboard">Admin</Link></li>
                </>
              )}
              <li className="nav-item">
                <button className="btn btn-danger btn-sm ms-2" onClick={onLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
