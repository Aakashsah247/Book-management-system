import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");

    alert("Logged out successfully.");

    navigate("/admin/login");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          BookHub
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>

          {token ? (
            <>
              <Link to="/admin/dashboard">Dashboard</Link>

              <button onClick={handleLogout} className="nav-logout">
                Logout
              </button>
            </>
          ) : (
            <Link to="/admin/login" className="admin-btn">
              Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;