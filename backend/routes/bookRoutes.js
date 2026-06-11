const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  increaseDownloadCount,
} = require("../controllers/bookController");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  createBook
);

router.get("/", getBooks);
router.patch("/:id/download", increaseDownloadCount);
router.get("/:id", getBookById);

router.put(
  "/:id",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  updateBook
);

router.delete("/:id", deleteBook);

module.exports = router;