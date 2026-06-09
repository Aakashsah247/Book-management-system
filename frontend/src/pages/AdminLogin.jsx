import { useState } from "react";
import { Link } from "react-router-dom";


function AdminLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password:""
    })
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Admin Login Data:", formData);
        alert("Login functionality will be connected with backend later.");
    }
    return (
        <section className="login-page">
            <div className="login-box">
                <div className="login-head">
                    <h2>Admin Login</h2>
                    <p>Login to upload and manage books.</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="enter admin email"
                        value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="enter admin password"
                        value={formData.password} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="login-btn">Login</button>
                    
                </form>

                <div className="login-footer">
                    <Link to="/">Back to Home</Link>
                </div>
            </div>
        </section>
    )
}

export default AdminLogin;