import { Link } from "react-router-dom";

const recentBooks = [
    {
    id: 1,
    title: "The Digital World",
    author: "John Smith",
    category: "Education",
    date: "2026-01-10",
  },
  {
    id: 2,
    title: "Life of a Programmer",
    author: "Sarah Wilson",
    category: "Programming",
    date: "2026-01-12",
  },
  {
    id: 3,
    title: "Stories of Tomorrow",
    author: "David Brown",
    category: "Novel",
    date: "2026-01-15",
  },
]

function AdminDashboard() {
    return (
         <section className="admin-page">
            <div className="admin-head">
                <div>
                    <h2>Admin Dashboard</h2>
                    <p>Manage books, novels, PDFs, and reading materials.</p>
                </div>

                    <Link to = "/admin/upload" className="btn-primary"></Link>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <span>Total Books</span>
                        <h3>24</h3>
                        <p>Books available for public users.</p>
                    </div>

                    <div className="dashboard-card">
                        <span>Total Categories</span>
                        <h3>8</h3>
                        <p>Book categories added in the system.</p>
                    </div>

                    <div className="dashboard-card">
                        <span>Total Downloads</span>
                        <h3>156</h3>
                        <p>Free downloads by public users.</p>
                    </div>

                    <div className="dashboard-card">
                        <span>Admin Status</span>
                        <h3>Active</h3>
                        <p>You can upload and manage books.</p>
                    </div>
                </div>

                <div className="admin-actions">
                    <Link to = "/admin/upload" className="action-card">
                    <h3>Upload Book</h3>
                    <p>Add a new book with cover image and PDF file.</p>
                    </Link>

                    <Link to ="/admin/books" className="action-card">
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

                    <table>
                        <thead>
                            <tr>
                                <th>Book Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Upload Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentBooks.map((book) =>(
                                <tr key={book.id}>
                                    <td >{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>{book.date}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div> 
         </section>
    )
}

export default AdminDashboard;