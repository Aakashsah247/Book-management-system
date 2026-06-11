const prisma = require("../config/prisma");

// Create new book
const createBook = async (req, res) => {
  try {
    const { title, author, category, description } = req.body;

    const coverImage = req.files?.coverImage?.[0];
    const pdfFile = req.files?.pdfFile?.[0];

    const coverImageUrl = coverImage
    ? `${req.protocol}://${req.get("host")}/uploads/covers/${coverImage.filename}`
    : null;

    const pdfFileUrl = pdfFile
    ? `${req.protocol}://${req.get("host")}/uploads/pdfs/${pdfFile.filename}`
    : null;

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
      ? `${req.protocol}://${req.get("host")}/uploads/covers/${coverImage.filename}`
      : existingBook.coverImageUrl;

    const pdfFileUrl = pdfFile
      ? `${req.protocol}://${req.get("host")}/uploads/pdfs/${pdfFile.filename}`
      : existingBook.pdfFileUrl;

    const book = await prisma.book.update({
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

    res.status(200).json({
      message: "Book updated successfully",
      book,
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

    await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Book deleted successfully",
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