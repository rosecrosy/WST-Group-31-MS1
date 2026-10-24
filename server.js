const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

// ===================================
// File Paths
// ===================================

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "books.json");

// ===================================
// Middleware
// ===================================

app.use(express.json());

// ===================================
// JSON File Management
// ===================================

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }

    await fs.writeFile(DATA_FILE, "[]\n", "utf8");
  }
}

async function readBooks() {
  const content = await fs.readFile(DATA_FILE, "utf8");
  const books = JSON.parse(content);

  if (!Array.isArray(books)) {
    throw new Error("books.json must contain an array.");
  }

  return books;
}

async function writeBooks(books) {
  await fs.writeFile(DATA_FILE, JSON.stringify(books, null, 2) + "\n", "utf8");
}

// ===================================
// Request Validation
// ===================================

function validateBook(book) {
  if (!book || typeof book !== "object" || Array.isArray(book)) {
    return "Request body must be a JSON object.";
  }

  const requiredFields = [
    "title",
    "author",
    "startDate",
    "genre",
    "subgenre",
    "status",
    "rating",
    "lesson",
  ];

  const missingField = requiredFields.find(
    (field) => String(book[field] ?? "").trim() === "",
  );

  if (missingField) {
    return `${missingField} is required.`;
  }

  return null;
}

// ===================================
// Book Record
// ===================================

function createBookRecord(book) {
  return {
    id: typeof book.id === "string" && book.id.trim() ? book.id : randomUUID(),

    title: String(book.title).trim(),
    author: String(book.author).trim(),
    startDate: String(book.startDate),
    endDate: String(book.endDate ?? ""),
    genre: String(book.genre),
    subgenre: String(book.subgenre),
    status: String(book.status),
    rating: book.rating,
    characters: String(book.characters ?? "").trim(),
    lesson: String(book.lesson).trim(),

    createdAt:
      typeof book.createdAt === "string" && book.createdAt
        ? book.createdAt
        : new Date().toISOString(),
  };
}

// ===================================
// GET: Retrieve All Books
// ===================================

app.get("/api/books", async (req, res) => {
  try {
    const books = await readBooks();

    res.json(books);
  } catch (error) {
    console.error("Error loading books:", error);

    res.status(500).json({
      error: "Failed to load books.",
    });
  }
});

// ===================================
// POST: Add a Book
// ===================================

app.post("/api/books", async (req, res) => {
  try {
    const validationError = validateBook(req.body);

    if (validationError) {
      return res.status(400).json({
        error: validationError,
      });
    }

    const books = await readBooks();
    const newBook = createBookRecord(req.body);

    const duplicate = books.some((book) => book.id === newBook.id);

    if (duplicate) {
      return res.status(409).json({
        error: "A book with this ID already exists.",
      });
    }

    books.push(newBook);

    await writeBooks(books);

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book:", error);

    res.status(500).json({
      error: "Failed to add book.",
    });
  }
});

// ===================================
// PUT: Update an Existing Book
// ===================================

app.put("/api/books/:id", async (req, res) => {
  try {
    const validationError = validateBook(req.body);

    if (validationError) {
      return res.status(400).json({
        error: validationError,
      });
    }

    const books = await readBooks();

    const index = books.findIndex((book) => book.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        error: "Book not found.",
      });
    }

    const updatedBook = createBookRecord({
      ...req.body,
      id: req.params.id,
      createdAt: req.body.createdAt || books[index].createdAt,
    });

    books[index] = updatedBook;

    await writeBooks(books);

    res.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);

    res.status(500).json({
      error: "Failed to update book.",
    });
  }
});

// ===================================
// DELETE: Remove a Book
// ===================================

app.delete("/api/books/:id", async (req, res) => {
  try {
    const books = await readBooks();

    const index = books.findIndex((book) => book.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        error: "Book not found.",
      });
    }

    books.splice(index, 1);

    await writeBooks(books);

    res.json({
      message: "Book deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting book:", error);

    res.status(500).json({
      error: "Failed to delete book.",
    });
  }
});

// ===================================
// Serve the Existing Frontend
// ===================================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "style.css"));
});

app.use("/js", express.static(path.join(__dirname, "js")));

// ===================================
// Handle Unknown Routes
// ===================================

app.use("/api", (req, res) => {
  res.status(404).json({
    error: "API endpoint not found.",
  });
});

app.use((req, res) => {
  res.status(404).send("Page not found.");
});

// ===================================
// Start Server
// ===================================

async function startServer() {
  try {
    await ensureDataFile();

    app.listen(PORT, () => {
      console.log(`Book Tracker server running at http://localhost:${PORT}`);
      console.log(`Book data file: ${DATA_FILE}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exitCode = 1;
  }
}

startServer();