import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/admin/login", formData);

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminInfo", JSON.stringify(res.data.admin));

      alert("Login successful.");

      navigate("/admin/dashboard");
    } catch (error) {
  console.error("Login error:", error);

  const message =
    error.response?.data?.message ||
    error.message ||
    "Unable to connect to the server.";

  alert(message);
} finally {
  setLoading(false);
}
  };

  return (
    <section className="login-page">
      <div className="login-box">
        <div className="login-head">
          <h2>Admin Login</h2>
          <p>Login to upload and manage books.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter admin password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;