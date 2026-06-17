import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-box">
        <div className="footer-brand">
          <h3>BookHub</h3>
        </div>

        <p className="footer-tagline">Read and download books for free.</p>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/admin/login">Admin</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 BookHub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;