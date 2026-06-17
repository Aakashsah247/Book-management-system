// Load environment variables before routes and configuration files.
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/books", bookRoutes);
app.use("/api/admin", adminRoutes);

// Test routes
app.get("/", (req, res) => {
  res.send("Book Management System Backend is running");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Frontend connected with backend successfully",
  });
});

// Handle upload and other middleware errors.
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.status || 400).json({
    message: error.message || "Something went wrong",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});