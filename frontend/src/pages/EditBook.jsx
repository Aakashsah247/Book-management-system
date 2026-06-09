import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const books = [
    {
    id: 1,
    title: "The Digital World",
    author: "John Smith",
    category: "Education",
    description:
      "A simple book about digital technology and modern systems.",
  },
  {
    id: 2,
    title: "Life of a Programmer",
    author: "Sarah Wilson",
    category: "Programming",
    description:
      "A beginner friendly novel about coding and problem solving.",
  },
  {
    id: 3,
    title: "Stories of Tomorrow",
    author: "David Brown",
    category: "Novel",
    description:
      "A collection of short futuristic stories and creative ideas.",
  },
  {
    id: 4,
    title: "Science for Everyone",
    author: "Emma Davis",
    category: "Science",
    description:
      "Basic science concepts explained in easy language.",
  },
]
function EditBook() {
    const { id } = useParams();
    const selectedBook = books.find((book) => book.id === Number(id));

    const [formData, setFormData] = useState({
    title: selectedBook ? selectedBook.title : "",
    author: selectedBook ? selectedBook.author : "",
    category: selectedBook ? selectedBook.category : "",
    description: selectedBook ? selectedBook.description : "",
    coverImage: null,
    pdfFile: null,
  });

if (!selectedBook)
{
    return(
        <section className="admin-page">
             <h2>Book Not Found</h2>
             <p>The book you want to edit does not exist.</p>
             <Link to="/admin/books" className="btn-primary">Back to Manage Books</Link>
        </section>
    )
}

const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
}

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Book Data:", formData);
    alert("Book update functionality will be connected with backend later.");
}

return(
    <section className="admin-page">
        <div className="admin-head">
            <div>
                <h2>Edit Book</h2>
                <p>Update book title, author, category, description, cover, or PDF.</p>
            </div>

            <Link to="/admin/books" className="btn-light">Back to Manage Books</Link>
        </div>

        <div className="upload-box">
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Book Title</label>
                        <input type="text" name="title" placeholder="Enter book title"
                        value={formData.title} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Author Name</label>
                        <input type="text" name="author" placeholder="Enter author name"
                        value={formData.author} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} required >
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
                    <textarea name="description" placeholder="Write short book description" rows="5"
                     value={formData.description} onChange={handleChange} required> </textarea>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Change Cover Image</label>
                        <input type="file" name="coverImage"  accept="image/*"  onChange={handleChange} />
                    </div>

                     <div className="form-group">
                         <label>Change PDF File</label>
                         <input type="file" name="pdfFile" accept="application/pdf" onChange={handleChange} />
                    </div>
                </div>

                <button type="submit" className="login-btn">Update Book</button>
            </form>
        </div>
    </section>
)

}

export default EditBook;
