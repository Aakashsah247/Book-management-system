const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "coverImage") {
    const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedImageTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, and WEBP cover images are allowed"), false);
    }

    return cb(null, true);
  }

  if (file.fieldname === "pdfFile") {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }

    return cb(null, true);
  }

  return cb(new Error("Invalid file field"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 150 * 1024 * 1024,
  },
});

module.exports = upload;