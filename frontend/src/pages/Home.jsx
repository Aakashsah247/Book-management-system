import { Link } from "react-router-dom";

import { useEffect } from "react";
import API from "../services/api";

function Home() {
    useEffect (() =>{
        const testBackend = async ()=> {
            try{
                const res = await API.get("/test");
                console.log("Backend connected:", res.data);
            } catch (error) {
                console.log("Backend connection error:", error.message);
            }
        }
        testBackend();

    }, []);
    
    return (
        <>
        <section className="hero">
             <div className="hero-content">
                <span className="hero-label">Free Digital Library</span>
                <h1>Read Books and Novels Online for Free</h1>
                <p>  Explore free books, novels, educational PDFs, stories, and other 
                    reading materials uploaded by admin. </p>

                     <div className="hero-buttons">
                        <Link to="/books" className="btn-primary">Browse Books</Link>
                        <Link to="/admin/login" className="btn-outline">Admin Login</Link>
                     </div>
             </div>
        </section>

        <section className="features">
            <div className="section-head">
                <h2>What Users Can Do</h2>
                <p>Simple features for reading and downloading books.</p>
            </div>

             <div className="feature-grid">
                 <div className="feature-card">
                    <h3>Read Online</h3>
                    <p>Public users can open books and novels directly in the browser.</p>
                 </div>

                 <div className="feature-card">
                    <h3>Download Free</h3>
                    <p>Users can download available PDF books without payment.</p>
                 </div>

                 <div className="feature-card">
                     <h3>Admin Upload</h3>
                     <p>Admin can upload books, covers, categories, and descriptions.</p>
                 </div>
             </div>
        </section>
        </>

    )
}

export default Home;

