import { Link } from "react-router-dom";

function Navbar() {
    return (
        < header className="navbar">
            <div className="nav-container">
                <Link to = "/" className="logo">BookHub</Link>

                <nav className="nav-links">
                    <Link to  = "/"> Home</Link>
                    <Link to ="/books"> Books</Link>
                    <Link to = "/admin/login" className="admin-btn">Admin</Link>

                </nav>
            </div>
        </header>
    )
}

export default Navbar;