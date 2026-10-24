const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const app = express();
const PORT = 3000;

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "books.json");
console.log("Book data file:", DATA_FILE);

app.use(express.json());

async function readBooks() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(DATA_FILE, "[]");
      return [];
    }

    throw error;
  }
}

async function saveBooks(books) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(books, null, 2));
}

app.get("/api", (req, res) => {
  res.json({ message: "Book Tracker API is running!" });
});

// Retrieve all books
app.get("/api/books", async (req, res) => {
  try {
    res.json(await readBooks());
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve books." });
  }
});

// Add a book
app.post("/api/books", async (req, res) => {
  try {
    const book = req.body;

    if (!book || typeof book.title !== "string" || !book.title.trim()) {
      return res.status(400).json({
        error: "Book title is required.",
      });
    }

    const books = await readBooks();

    const newBook = {
      ...book,
      id: randomUUID(),
    };

    books.push(newBook);
    await saveBooks(books);

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to add book." });
  }
});

// Update a book
app.put("/api/books/:id", async (req, res) => {
  try {
    const books = await readBooks();
    const index = books.findIndex((book) => book.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        error: "Book not found.",
      });
    }

    if (
      !req.body ||
      typeof req.body.title !== "string" ||
      !req.body.title.trim()
    ) {
      return res.status(400).json({
        error: "Book title is required.",
      });
    }

    books[index] = {
      ...req.body,
      id: req.params.id,
    };

    await saveBooks(books);
    res.json(books[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update book." });
  }
});

// Delete a book
app.delete("/api/books/:id", async (req, res) => {
  try {
    const books = await readBooks();
    const updatedBooks = books.filter((book) => book.id !== req.params.id);

    if (updatedBooks.length === books.length) {
      return res.status(404).json({
        error: "Book not found.",
      });
    }

    await saveBooks(updatedBooks);
    res.json({ message: "Book deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/js", express.static(path.join(__dirname, "js")));

app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "style.css"));
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON request body.",
    });
  }

  next(err);
});
