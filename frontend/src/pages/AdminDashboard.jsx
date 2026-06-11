import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.log("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const totalBooks = books.length;

  const totalDownloads = books.reduce((total, book) => {
    return total + book.downloads;
  }, 0);

  const categories = [...new Set(books.map((book) => book.category))];
  const totalCategories = categories.length;

  const recentBooks = books.slice(0, 5);

  if (loading) {
    return (
      <section className="admin-page">
        <h2>Loading dashboard...</h2>
      </section>
    );
  }
// logout function
  const handleLogout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminInfo");
  window.location.href = "/admin/login";
};

  return (
    <section className="admin-page">
      <div className="admin-head">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Manage books, novels, PDFs, and reading materials.</p>
        </div>

        <div className="head-actions">
          <Link to="/admin/upload" className="btn-primary">
          Upload New Book
        </Link>
        <button onClick={handleLogout} className="delete-btn"> Logout</button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span>Total Books</span>
          <h3>{totalBooks}</h3>
          <p>Books available for public users.</p>
        </div>

        <div className="dashboard-card">
          <span>Total Categories</span>
          <h3>{totalCategories}</h3>
          <p>Book categories added in the system.</p>
        </div>

        <div className="dashboard-card">
          <span>Total Downloads</span>
          <h3>{totalDownloads}</h3>
          <p>Free downloads by public users.</p>
        </div>

        <div className="dashboard-card">
          <span>Admin Status</span>
          <h3>Active</h3>
          <p>You can upload and manage books.</p>
        </div>
      </div>

      <div className="admin-actions">
        <Link to="/admin/upload" className="action-card">
          <h3>Upload Book</h3>
          <p>Add a new book with cover image and PDF file.</p>
        </Link>

        <Link to="/admin/books" className="action-card">
          <h3>Manage Books</h3>
          <p>Edit, update, or delete uploaded books.</p>
        </Link>

        <Link to="/books" className="action-card">
          <h3>View Public Site</h3>
          <p>Check how books appear to public users.</p>
        </Link>
      </div>

      <div className="table-box">
        <div className="table-head">
          <h3>Recent Uploaded Books</h3>
          <Link to="/admin/books">View All</Link>
        </div>

        {recentBooks.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Downloads</th>
                <th>Upload Date</th>
              </tr>
            </thead>

            <tbody>
              {recentBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.downloads}</td>
                  <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No books uploaded yet.</p>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;