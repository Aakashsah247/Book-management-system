import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
  try {
    const res = await API.get("/books");
    console.log("Manage books:", res.data);
    setBooks(res.data);
  } catch (error) {
    console.log("Failed to fetch books:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const searchValue = searchText.toLowerCase();

    const matchesSearch =
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue) ||
      book.category.toLowerCase().includes(searchValue);

    const matchesCategory =
      selectedCategory === "" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/books/${id}`);

      setBooks(books.filter((book) => book.id !== id));

      alert("Book deleted successfully.");
    } catch (error) {
      console.log("Delete error:", error);
      alert("Failed to delete book.");
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-head">
        <div>
          <h2>Manage Books</h2>
          <p>View, edit, search, filter, and delete uploaded books.</p>
        </div>

        <div className="head-actions">
          <Link to="/admin/upload" className="btn-primary">
            Upload Book
          </Link>

          <Link to="/admin/dashboard" className="btn-light">
            Dashboard
          </Link>
        </div>
      </div>

      <div className="manage-box">
        <div className="manage-top">
          <input
            type="text"
            placeholder="Search uploaded books..."
            className="manage-search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <select
            className="manage-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Novel">Novel</option>
            <option value="Story">Story</option>
            <option value="Education">Education</option>
            <option value="Programming">Programming</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Poetry">Poetry</option>
            <option value="Biography">Biography</option>
          </select>
        </div>

        {loading ? (
          <p>Loading books...</p>
        ) : (
          <div className="table-box no-padding">
            <table>
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Downloads</th>
                  <th>Upload Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.category}</td>
                      <td>{book.downloads}</td>
                      <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="table-actions">
                          <Link to={`/books/${book.id}`} className="view-btn">
                            View
                          </Link>

                          <Link
                            to={`/admin/edit/${book.id}`}
                            className="edit-btn"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(book.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No books found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default ManageBooks;