import { useState } from "react";
import { Link } from "react-router-dom";

function UploadBook() {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        description: "",
        coverImage: null,
        pdfFile: null,
    })

    const handleChange = (e) => {
        const { name, value, files} = e.target;

        setFormData({
            ...formData,
            [name]:files ? files[0]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Book Upload Data:",formData)
        alert("Book upload functionality will be connected with backend later.");
    }
    return (
        <section className="admin-page">
            <div className="admin-head">
                <div>
                    <h2>Upload Book</h2>
                    <p>Add a new book, novel, or PDF reading material.</p>
                </div>

                <Link to ="/admin/dashboard" className="btn-light">Back to Dashboard</Link>
            </div>

            <div className="upload-box">
                <form onSubmit={handleSubmit} className="upload-form"></form>
                <div className="form-row">
                    <div className="form-group">
                        <label>Book Title</label>
                        <input type="text" name="title" placeholder="Enter book title"
                        value={formData.title} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Author Name</label>
                        <input type="text" name="author" placeholder="Enter author name"
                        value={formData.author} onChange={HashChangeEvent} required />
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
                    <textarea name="description" placeholder="Write short book description"
                    value={formData.description} onChange={handleChange} required ></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Cover Image</label>
                        <input type="file" name="coverImage" accept="image/*" onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>PDF File</label>
                        <input type="file" name="pdfFile" accept="application/pdf" onChange={handleChange} required />
                    </div>
                </div>

                <button type="submit" className="login-btn">Upload Book</button>
            </div>
        </section>
    )
}

export default UploadBook;