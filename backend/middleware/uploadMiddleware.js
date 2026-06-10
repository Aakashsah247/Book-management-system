const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "coverImage") {
      cb(null, "uploads/covers");
    } else if (file.fieldname === "pdfFile") {
      cb(null, "uploads/pdfs");
    } else {
      cb(null, "uploads");
    }
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "coverImage") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for cover image"), false);
    }
  } else if (file.fieldname === "pdfFile") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  } else {
    cb(new Error("Invalid file field"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;