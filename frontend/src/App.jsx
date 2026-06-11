import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import ReadBook from "./pages/ReadBook";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UploadBook from "./pages/UploadBook";
import ManageBooks from "./pages/ManageBooks";
import EditBook from "./pages/EditBook";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/read/:id" element={<ReadBook />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route 
          path="/admin/dashboard"
          element= {
             <ProtectedRoute>
             <AdminDashboard />
            </ProtectedRoute>
          }
          />
          <Route
          path="/admin/upload"
           element={
            <ProtectedRoute>
            <UploadBook />
            </ProtectedRoute>
          }
           />

          <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute>
            <EditBook />
            </ProtectedRoute>
          }
            />
      </Routes>
    </main>
    <Footer />
    </>
  );
}

export default App;