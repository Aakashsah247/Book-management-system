import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [bookFound, setBookFound] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    coverImage: null,
    pdfFile: null,
  });

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);

      setFormData({
        title: res.data.title || "",
        author: res.data.author || "",
        category: res.data.category || "",
        description: res.data.description || "",
        coverImage: null,
        pdfFile: null,
      });

      setBookFound(true);
    } catch (error) {
      console.log("Failed to fetch book:", error);
      setBookFound(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("category", formData.category);
      data.append("description", formData.description);

      if (formData.coverImage) {
        data.append("coverImage", formData.coverImage);
      }

      if (formData.pdfFile) {
        data.append("pdfFile", formData.pdfFile);
      }

      await API.put(`/books/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book updated successfully.");

      navigate("/admin/books");
    } catch (error) {
      console.log("Update error:", error);
      const message =
      error.response?.data?.message || "Book update failed. Please try again.";
      alert(message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <section className="admin-page">
        <h2>Loading book...</h2>
      </section>
    );
  }

  if (!bookFound) {
    return (
      <section className="admin-page">
        <h2>Book Not Found</h2>
        <p>The book you want to edit does not exist.</p>

        <Link to="/admin/books" className="btn-primary">
          Back to Manage Books
        </Link>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="admin-head">
        <div>
          <h2>Edit Book</h2>
          <p>Update book title, author, category, description, cover, or PDF.</p>
        </div>

        <Link to="/admin/books" className="btn-light">
          Back to Manage Books
        </Link>
      </div>

      <div className="upload-box">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-row">
            <div className="form-group">
              <label>Book Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter book title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Author Name</label>
              <input
                type="text"
                name="author"
                placeholder="Enter author name"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
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

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Write short book description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Change Cover Image</label>
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Change PDF File</label>
              <input
                type="file"
                name="pdfFile"
                accept="application/pdf"
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={updating}>
            {updating ? "Updating..." : "Update Book"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditBook;