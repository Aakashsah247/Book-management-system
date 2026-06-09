import { Link } from "react-router-dom";

function Home() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Free Online Book Library</h1>
                <p> Read books, novels, educational materials, and download them for free.</p>

                <div className="hero-buttons">
                    <Link to="/books" className="btn-primary">Browse Books</Link>
                    <Link to="/admin/login" className="btn-outline">Admin Login</Link>
                </div>
            </div>
        </section>
    )
}

export default Home;
