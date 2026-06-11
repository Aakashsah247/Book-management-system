import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setBook(res.data);
    } catch (error) {
      console.log("Failed to fetch book:", error);
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="page">
        <h2>Loading book...</h2>
      </section>
    );
  }

  if (!book) {
    return (
      <section className="page">
        <h2>Book Not Found</h2>
        <p>The book you are looking for does not exist.</p>

        <Link to="/books" className="btn-primary">
          Back to Books
        </Link>
      </section>
    );
  }

  const coverImage =
    book.coverImageUrl ||
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop";

    const handleDownload = async() => {
      if (!book.pdfFileUrl) return;
      try{
        await API.patch(`/books/${book.id}/download`);
        window.open(book.pdfFileUrl, "_blank");

        setBook({
          ...book,
          downloads: book.downloads + 1, 
        });
      } catch (error) {
        console.log("Download count error:", error);
        window.open(book.pdfFileUrl, "_blank");
      }
    }

  return (
    <section className="page">
      <div className="details-box">
        <div className="details-cover">
          <img src={coverImage} alt={book.title} />
        </div>

        <div className="details-info">
          <span className="book-category">{book.category}</span>

          <h2>{book.title}</h2>

          <p className="details-author">By {book.author}</p>

          <p className="details-desc">{book.description}</p>

          <div className="book-meta">
            <div>
              <strong>Downloads</strong>
              <span>{book.downloads}</span>
            </div>

            <div>
              <strong>Status</strong>
              <span>{book.isPublished ? "Published" : "Draft"}</span>
            </div>

            <div>
              <strong>Uploaded</strong>
              <span>{new Date(book.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="details-actions">
            <Link to={`/read/${book.id}`} className="btn-primary">
              Read Online
            </Link>

            {book.pdfFileUrl ? (
              <button onClick={handleDownload} className="btn-outline" Download PDF ></button>
            ) : (
              <button className="btn-outline" disabled>
                PDF Not Available
              </button>
            )}

            <Link to="/books" className="btn-light">
              Back to Books
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetails;