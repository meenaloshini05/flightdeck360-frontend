import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "passenger" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/register", form);
      alert("Registered successfully!");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Register</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-2" placeholder="Name"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" className="form-control mb-2" placeholder="Email"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="form-control mb-2" placeholder="Password"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select className="form-control mb-3"
          value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="passenger">Passenger</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}
