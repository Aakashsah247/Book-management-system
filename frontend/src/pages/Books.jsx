import BookCard from "../components/BookCard";

const books = [
  {
    id: 1,
    title: "The Digital World",
    author: "John Smith",
    category: "Education",
    description: "A simple book about digital technology and modern systems.",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Life of a Programmer",
    author: "Sarah Wilson",
    category: "Programming",
    description: "A beginner friendly novel about coding and problem solving.",
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Stories of Tomorrow",
    author: "David Brown",
    category: "Novel",
    description: "A collection of short futuristic stories and creative ideas.",
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Science for Everyone",
    author: "Emma Davis",
    category: "Science",
    description: "Basic science concepts explained in easy language.",
    cover:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&auto=format&fit=crop",
  },
];

function Books() {
  return (
    <section className="page">
      <div className="section-head left">
        <h2>All Books</h2>
        <p>Browse available books, novels, and study materials.</p>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search book by title, author, or category..." />
        <button>Search</button>
      </div>

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

export default Books;