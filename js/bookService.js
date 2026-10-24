const API_URL = "/api/books";

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }

  return data;
}

// Get all books
export async function getBooks() {
  return request(API_URL);
}

// Add a book
export async function addBook(book) {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(book),
  });
}

// Update a book
export async function updateBook(book) {
  return request(`${API_URL}/${encodeURIComponent(book.id)}`, {
    method: "PUT",
    body: JSON.stringify(book),
  });
}

// Delete a book
export async function deleteBook(bookId) {
  return request(`${API_URL}/${encodeURIComponent(bookId)}`, {
    method: "DELETE",
  });
}
