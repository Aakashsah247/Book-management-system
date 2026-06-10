import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";

function ReadBook() {
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
      console.log("Failed to fetch book:", error.message);
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
        <p>The book you want to read does not exist.</p>

        <Link to="/books" className="btn-primary">
          Back to Books
        </Link>
      </section>
    );
  }

  return (
    <section className="reader-page">
      <div className="reader-head">
        <div>
          <h2>{book.title}</h2>
          <p>By {book.author}</p>
        </div>

        <div className="reader-actions">
          <Link to={`/books/${book.id}`} className="btn-light"> Details </Link>

          {book.pdfFileUrl ? (
            <a href={book.pdfFileUrl} download className="btn-primary"> Download</a>
          ) : (
            <button className="btn-primary" disabled> No PDF </button>
          )}
        </div>
      </div>

      {book.pdfFileUrl ? (
        <div className="pdf-box">
          <iframe src={book.pdfFileUrl} title={book.title}></iframe>
        </div>
      ) : (
        <div className="empty-pdf-box">
          <h3>PDF Not Available</h3>
          <p>This book does not have a PDF file uploaded yet.</p>

          <Link to="/books" className="btn-primary"> Back to Books </Link>
        </div>
      )}
    </section>
  );
}

export default ReadBook;