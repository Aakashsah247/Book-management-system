const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bookRoutes = require("./routes/bookRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/books", bookRoutes);

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