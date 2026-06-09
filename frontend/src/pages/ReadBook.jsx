import { Link, useParams } from "react-router-dom";

const books = [
    {
    id: 1,
    title: "The Digital World",
    author: "John Smith",
    pdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 2,
    title: "Life of a Programmer",
    author: "Sarah Wilson",
    pdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 3,
    title: "Stories of Tomorrow",
    author: "David Brown",
    pdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 4,
    title: "Science for Everyone",
    author: "Emma Davis",
    pdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
]

function ReadBook() {
    const { id } = useParams();
    const book = books.find((item) => item.id === Number(id));
     if (!book)
     {
        return (
            <section className="page">
                <h2>Book Not Found</h2>
                <p>The book you want to read does not exist.</p>
                <Link to="/books" className="btn-primary">Back to Books</Link>
            </section>
        )
     }

    return (
        <section className="page">
            <div className="reader-head">
                <div>
                    <h2>{book.title}</h2>
                    <p>By {book.author}</p>
                </div>

                <div className="reader-actions">
                    <Link to={`/books/${book.id}`} className="btn-light">Details</Link>

                    <a href={book.pdf} download className="btn-primary">Download</a>
                </div>
            </div>

            <div className="pdf-box">
                <iframe src={book.pdf} title={book.title}></iframe>
            </div>
        </section>
    )
}

export default ReadBook;