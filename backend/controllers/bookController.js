const prisma = require("../config/prisma");
const supabase = require("../config/supabase");

const {
  removeStorageFiles,
} = require("../utils/storageHelpers");

const bucketName = process.env.SUPABASE_BUCKET || "books";

const createFileName = (folder, file) => {
  const fileExtension = file.originalname.split(".").pop();
  const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  return `${folder}/${uniqueName}.${fileExtension}`;
};

const uploadToSupabase = async (folder, file) => {
  if (!file) return null;

  const filePath = createFileName(folder, file);

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

  return data.publicUrl;
};

// Create new book
const createBook = async (req, res) => {
  try {
    const { title, author, category, description } = req.body;

    if (!title || !author || !category || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.files?.coverImage?.[0]) {
      return res.status(400).json({
        message: "Cover image is required",
      });
    }

    if (!req.files?.pdfFile?.[0]) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    const coverImage = req.files.coverImage[0];
    const pdfFile = req.files.pdfFile[0];

    const coverImageUrl = await uploadToSupabase("covers", coverImage);
    const pdfFileUrl = await uploadToSupabase("pdfs", pdfFile);

    const book = await prisma.book.create({
      data: {
        title,
        author,
        category,
        description,
        coverImageUrl,
        pdfFileUrl,
      },
    });

    res.status(201).json({
      message: "Book uploaded successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload book",
      error: error.message,
    });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch books",
      error: error.message,
    });
  }
};

// Get single book
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch book",
      error: error.message,
    });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, category, description } = req.body;

    if (!title || !author || !category || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingBook = await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const coverImage = req.files?.coverImage?.[0];
    const pdfFile = req.files?.pdfFile?.[0];

    const coverImageUrl = coverImage
      ? await uploadToSupabase("covers", coverImage)
      : existingBook.coverImageUrl;

    const pdfFileUrl = pdfFile
      ? await uploadToSupabase("pdfs", pdfFile)
      : existingBook.pdfFileUrl;

    const updatedBook = await prisma.book.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        author,
        category,
        description,
        coverImageUrl,
        pdfFileUrl,
      },
    });

    // Remove old files only after the database update succeeds.
    const oldFiles = [];

    if (coverImage && existingBook.coverImageUrl) {
      oldFiles.push(existingBook.coverImageUrl);
    }

    if (pdfFile && existingBook.pdfFileUrl) {
      oldFiles.push(existingBook.pdfFileUrl);
    }

    const cleanupResult = await removeStorageFiles(oldFiles);

    if (cleanupResult.error) {
      console.warn(
        "Book updated, but an old Storage file could not be removed:",
        cleanupResult.error
      );
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update book",
      error: error.message,
    });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBook = await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    // Delete the database record first.
    await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });

    // Clean up its cover image and PDF from Supabase Storage.
    const cleanupResult = await removeStorageFiles([
      existingBook.coverImageUrl,
      existingBook.pdfFileUrl,
    ]);

    if (cleanupResult.error) {
      console.warn(
        "Book deleted, but Storage cleanup failed:",
        cleanupResult.error
      );
    }

    res.status(200).json({
      message: "Book and its files deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete book",
      error: error.message,
    });
  }
};
// Increase book download count
const increaseDownloadCount = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBook = await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const book = await prisma.book.update({
      where: {
        id: Number(id),
      },
      data: {
        downloads: {
          increment: 1,
        },
      },
    });

    res.status(200).json({
      message: "Download count updated successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update download count",
      error: error.message,
    });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  increaseDownloadCount,
};