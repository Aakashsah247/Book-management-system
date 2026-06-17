// Load environment variables before routes and configuration files.
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Requests without an origin include tools and direct API checks.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("This website origin is not allowed"));
    },
  })
);

app.use(express.json());

// API routes
app.use("/api/books", bookRoutes);
app.use("/api/admin", adminRoutes);

// Basic server test
app.get("/", (req, res) => {
  res.send("Book Management System Backend is running");
});

// Deployment health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Book Management System API is healthy",
    environment: process.env.NODE_ENV || "development",
  });
});

// Central error handler
app.use((error, req, res, next) => {
  console.error(error.message);

  res.status(error.status || 400).json({
    message: error.message || "Something went wrong",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});