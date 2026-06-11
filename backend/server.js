const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bookRoutes = require("./routes/bookRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/books", bookRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Book Management System Backend is running");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Frontend connected with backend successfully",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});