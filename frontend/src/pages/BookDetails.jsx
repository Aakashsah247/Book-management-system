import { Link, useParams } from "react-router-dom";

const books = [
    {
    id: 1,
    title: "The Digital World",
    author: "John Smith",
    category: "Education",
    description:
      "A simple book about digital technology, modern systems, internet, software, and how digital tools are changing daily life.",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop",
    pages: 120,
    language: "English",
    uploadDate: "2026-01-10",
  },
  {
    id: 2,
    title: "Life of a Programmer",
    author: "Sarah Wilson",
    category: "Programming",
    description:
      "A beginner friendly novel about coding, problem solving, software development, and the journey of becoming a programmer.",
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&auto=format&fit=crop",
    pages: 95,
    language: "English",
    uploadDate: "2026-01-12",
  },
  {
    id: 3,
    title: "Stories of Tomorrow",
    author: "David Brown",
    category: "Novel",
    description:
      "A collection of short futuristic stories about imagination, technology, life, and creative ideas.",
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop",
    pages: 150,
    language: "English",
    uploadDate: "2026-01-15",
  },
  {
    id: 4,
    title: "Science for Everyone",
    author: "Emma Davis",
    category: "Science",
    description:
      "Basic science concepts explained in easy language for students and general readers.",
    cover:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&auto=format&fit=crop",
    pages: 180,
    language: "English",
    uploadDate: "2026-01-20",
  },
]

function BookDetails() {
    const { id } = useParams();
    const book = books.find((item) => item.id === Number(id));
    if (!book) {
        return (
            <section className="page">
                <h2>Book Not Found</h2>
                <p>The book you are looking for does not exist.</p>
                <Link to="/books" className="btn-primary">Back to Books</Link>
            </section>
        )
    }
    return (
        <section className="page">
            <div className="details-box">
                <div className="details-cover">
                    <img src={book.cover} alt={book.title} />
                </div>
                <div className="details-info">
                    <span className="book-category">{book.category}</span>
                    <h2>{book.title}</h2>
                    <p className="details-author">By {book.author}</p>
                     <p className="details-desc">{book.description}</p>

                      <div className="book-meta">
                         <div>
                            <strong>Pages</strong>
                            <span>{book.pages}</span>
                         </div>

                         <div>
                            <strong>Language</strong>
                            <span>{book.language}</span>
                         </div>

                         <div>
                            <strong>Uploaded</strong>
                            <span>{book.uploadDate}</span>
                         </div>
                      </div>

                      <div className="details-actions">
                        <Link to={`/read/${book.id}`} className="btn-primary">Read Online</Link>
                        <button className="btn-outline">Download PDF</button>
                        <Link to="/books" className="btn-light">Back to Books</Link>
                      </div>
                </div>
            </div>
        </section>
    )
}

export default BookDetails;
