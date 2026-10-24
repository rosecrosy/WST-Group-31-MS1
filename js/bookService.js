// ===================================
// Book Service — REST API
// ===================================

const API_URL = "/api/books";

// ===================================
// API Request Helper
// ===================================

async function apiRequest(url, options = {}) {
  let response;

  try {
    response = await fetch(url, options);
  } catch (error) {
    throw new Error(
      "Cannot connect to the backend. Make sure the server is running."
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.error || `Request failed with status ${response.status}.`
    );
  }

  return data;
}

// ===================================
// Get Books
// ===================================

export async function getBooks() {
  const books = await apiRequest(API_URL);

  if (!Array.isArray(books)) {
    throw new Error("The server returned an invalid book list.");
  }

  return books;
}

// ===================================
// Add Book
// ===================================

export async function addBook(book) {
  return apiRequest(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
}

// ===================================
// Update Book
// ===================================

export async function updateBook(book) {
  return apiRequest(
    `${API_URL}/${encodeURIComponent(book.id)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    }
  );
}

// ===================================
// Delete Book
// ===================================

export async function deleteBook(bookId) {
  return apiRequest(
    `${API_URL}/${encodeURIComponent(bookId)}`,
    {
      method: "DELETE",
    }
  );
}