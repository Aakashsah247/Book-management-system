import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import API from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try{
      const res = await API.get("/books");
      await API.get("/books");
    } catch (error) {
      console.log("Failed to fetch books:", error.message);

    } finally {
      setLoading(false);
    }

  }
  const filteredBooks = books.filter ((book) => {
    const searchValue = searchText.toLowerCase();

    return (
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue) ||
      book.category.toLowerCase().includes(searchValue)
    )

  })

  return (
    <section className="page">
      <div className="section-head left">
        <h2>All Books</h2>
        <p>Browse available books, novels, and study materials.</p>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search book by title, author, or category..."
        value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <button>Search</button>
      </div>
      {loading ? (
        <p>Loading books...</p>
      ) : filteredBooks.length > 0 ? (
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p>No books found.</p>
      )}
    </section>
  );
}

export default Books;