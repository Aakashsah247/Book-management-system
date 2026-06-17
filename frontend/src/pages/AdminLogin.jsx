import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminLogin() {
  const navigate = useNavigate();
  const passwordInputRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  setLoading(true);
  setMessage("");
  setMessageType("");

  try {
    const response = await API.post("/admin/login", {
      email,
      password,
    });

    const data = response.data;

    localStorage.setItem("adminToken", data.token);

    localStorage.setItem(
      "adminInfo",
      JSON.stringify(data.admin || data.user || { email })
    );

    setMessage("Login successful");
    setMessageType("success");

    // Automatically redirect without requiring an OK click.
    setTimeout(() => {
      navigate("/admin/dashboard", {
        replace: true,
      });
    }, 800);
  } catch (error) {
    console.error("Login error:", error);

    const errorMessage = error.response
      ? error.response.data?.message || "Invalid email or password"
      : "Unable to connect to the server";

    setMessage(errorMessage);
    setMessageType("error");

    // Clear only the incorrect password.
    setPassword("");

    // Return the cursor to the password field.
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 0);

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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Admin email"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              ref={passwordInputRef}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </div>

          {message && (
          <div className={`login-notice ${messageType}`}
            role="status"
            aria-live="polite"
          >
          {message}
          </div>
            )}

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