import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import BookCard from "../components/BookCard";

function Home() {
  const [latestBooks, setLatestBooks] = useState([]);

  useEffect(() => {
    fetchLatestBooks();
  }, []);

  const fetchLatestBooks = async () => {
    try {
      const res = await API.get("/books");
      setLatestBooks(res.data.slice(0, 3));
    } catch (error) {
      console.log("Failed to fetch latest books:", error);
    }
  };

  return (
    <>
      <section className="hero client-hero">
        <div className="hero-content">
          <span className="hero-label">Free Digital Book Library</span>

          <h1>Read Books, Novels, and Stories Online</h1>

          <p>
            Discover books, novels, stories, and educational reading materials
            uploaded by the writer. Read online or download PDF books for free.
          </p>

          <div className="hero-buttons">
            <Link to="/books" className="btn-primary">
              Explore Books
            </Link>

            <Link to="/admin/login" className="btn-outline">
              Writer Login
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-head">
          <h2>What Readers Can Do</h2>
          <p>A simple reading platform for public users.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Read Online</h3>
            <p>
              Readers can open books directly in the browser without installing
              any extra application.
            </p>
          </div>

          <div className="feature-card">
            <h3>Download Free</h3>
            <p>
              Available PDF books can be downloaded for free by public users.
            </p>
          </div>

          <div className="feature-card">
            <h3>Writer Managed</h3>
            <p>
              The writer can upload, edit, and manage books from a private admin
              dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="latest-section">
        <div className="section-head left">
          <h2>Latest Books</h2>
          <p>Recently uploaded books and reading materials.</p>
        </div>

        {latestBooks.length > 0 ? (
          <div className="book-grid">
            {latestBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="empty-home">
            <h3>No books uploaded yet</h3>
            <p>Latest books will appear here after the writer uploads them.</p>
          </div>
        )}

        <div className="center-btn">
          <Link to="/books" className="btn-primary">
            View All Books
          </Link>
        </div>
      </section>

      <section className="about-library">
        <div>
          <span className="hero-label">About This Library</span>
          <h2>A simple online space for readers</h2>
          <p>
            This website is designed for writers who want to share their books,
            novels, and stories with the public. Readers can browse, read, and
            download available books easily.
          </p>
        </div>

        <div className="about-card">
          <h3>For the Writer</h3>
          <p>
            Upload cover images, PDF books, descriptions, categories, and manage
            your reading collection from one secure dashboard.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;