import { Link } from "react-router-dom";

 function BookCard({ book }) {
    const coverImage= book.coverImageUrl ||
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop";

    return (
        <div className="book-card">
            
            <div className="book-cover">
                <img src={coverImage} alt={book.title}/>
            </div>
            
            <div className="book-info">
                <span className="book-category">{book.category}</span>
                <h3>{book.title}</h3>
                <p className="book-author">By {book.author}</p>
                <p className="book-desc">{book.description}</p>
            
            <div className="book-actions">
                <Link to={`/books/${book.id}`} className="small-btn">Details</Link>
                <Link to={`/read/${book.id}`} className="small-btn outline">Read</Link>
            </div>
            </div>
        </div>
    )
 }

 export default BookCard;