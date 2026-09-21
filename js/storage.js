const STORAGE_KEY = "bookTrackerBooks";

function getBooks() {
    const books = localStorage.getItem(STORAGE_KEY);

    return books ? JSON.parse(books) : [];
}

function saveBooks(books) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}