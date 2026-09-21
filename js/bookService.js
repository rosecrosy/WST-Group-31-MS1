// ===================================
// Book Service
// ===================================

const STORAGE_KEY = "bookTrackerBooks";

// ===================================
// Get Books
// ===================================

export function getBooks() {
  const books = localStorage.getItem(STORAGE_KEY);

  return books ? JSON.parse(books) : [];
}

// ===================================
// Save Books
// ===================================

function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

// ===================================
// Add Book
// ===================================

export function addBook(book) {
  const books = getBooks();

  books.push(book);

  saveBooks(books);
}

// ===================================
// Update Book
// ===================================

export function updateBook(book) {
  const books = getBooks();

  const updatedBooks = books.map((existingBook) => {
    if (existingBook.id === book.id) {
      return book;
    }

    return existingBook;
  });

  saveBooks(updatedBooks);
}

// ===================================
// Delete Book
// ===================================

export function deleteBook(bookId) {
  const books = getBooks();

  const updatedBooks = books.filter(
    (book) => book.id !== bookId
  );

  saveBooks(updatedBooks);
}