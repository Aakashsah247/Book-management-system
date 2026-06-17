const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const protectAdmin = require("../middleware/authMiddleware");

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  increaseDownloadCount,
} = require("../controllers/bookController");

const router = express.Router();

// Public routes
router.get("/", getBooks);
router.patch("/:id/download", increaseDownloadCount);
router.get("/:id", getBookById);

// Protected admin routes
router.post(
  "/",
  protectAdmin,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  createBook
);

router.put(
  "/:id",
  protectAdmin,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  updateBook
);

router.delete("/:id", protectAdmin, deleteBook);

module.exports = router;