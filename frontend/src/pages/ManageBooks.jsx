import { Link } from "react-router-dom";

const books = [
  {
    id: 1,
    title: "The Digital World",
    author: "John Smith",
    category: "Education",
    downloads: 42,
    date: "2026-01-10",
  },
  {
    id: 2,
    title: "Life of a Programmer",
    author: "Sarah Wilson",
    category: "Programming",
    downloads: 35,
    date: "2026-01-12",
  },
  {
    id: 3,
    title: "Stories of Tomorrow",
    author: "David Brown",
    category: "Novel",
    downloads: 61,
    date: "2026-01-15",
  },
  {
    id: 4,
    title: "Science for Everyone",
    author: "Emma Davis",
    category: "Science",
    downloads: 18,
    date: "2026-01-20",
  },
];

function ManageBooks() {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmDelete) {
      alert(`Book with ID ${id} will be deleted after backend connection.`);
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-head">
        <div>
          <h2>Manage Books</h2>
          <p>View, edit, and delete uploaded books.</p>
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
          />

          <select className="manage-filter">
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
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.downloads}</td>
                  <td>{book.date}</td>
                  <td>
                    <div className="table-actions">
                      <Link to={`/books/${book.id}`} className="view-btn">
                        View
                      </Link>

                      <Link to = {`/admin/edit/${book.id}`}className="edit-btn">Edit</Link>

                      <button
                        onClick={() => handleDelete(book.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ManageBooks;