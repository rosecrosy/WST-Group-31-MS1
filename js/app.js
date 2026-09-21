import { addBook, getBooks, updateBook, deleteBook } from "./bookService.js";

const bookForm = document.getElementById("bookForm");

const genreSelect = document.getElementById("genre");
const subgenreSelect = document.getElementById("subgenre");

window.books = [];
window.editingBookId = null;

// ===================================
// Initialize
// ===================================

bookForm.addEventListener("submit", handleBookSubmit);

loadGenres();

genreSelect.addEventListener("change", () => {
  loadSubgenres(genreSelect.value);
});

refreshUI();

// ===================================
// Delete Book
// ===================================

window.deleteBookHandler = async function (bookId) {
  const confirmed = confirm(
    "Are you sure you want to remove this book from your bookshelf?",
  );

  if (!confirmed) {
    return;
  }

  deleteBook(bookId);

  refreshUI();

  showToast("Book Removed", "The book has been removed from your bookshelf.");
};

// ===================================
// Submit Book
// ===================================

function handleBookSubmit(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const formData = new FormData(bookForm);

  const bookData = createBook(formData);

  if (window.editingBookId) {
    bookData.id = window.editingBookId;

    updateBook(bookData);

    refreshUI();

    showToast(
      "Reading Journey Updated",
      `"${bookData.title}" has been updated successfully.`,
    );

    window.editingBookId = null;

    document.getElementById("saveBookBtn").textContent = "Save Book";
  } else {
    addBook(bookData);

    refreshUI();

    showToast(
      "Book Added",
      `"${bookData.title}" has been added to your reading library.`,
    );
  }

  bookForm.reset();

  // Reset subgenre after form reset
  subgenreSelect.innerHTML = `
    <option value="">Select Main Genre First</option>
  `;
}

/* ===================================
   Form Validation
=================================== */

function validateForm() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const genre = document.getElementById("genre");
  const subgenre = document.getElementById("subgenre");
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const status = document.getElementById("status");
  const rating = document.getElementById("rating");
  const lesson = document.getElementById("lesson");

  // Remove previous validation styles
  document.querySelectorAll(".error").forEach((field) => {
    field.classList.remove("error");
  });

  // Helper function
  function showError(field, message) {
    field.classList.add("error");

    showToast("Some required fields are still empty.", message);

    field.focus();

    return false;
  }

  if (title.value.trim() === "") {
    return showError(title, "Please enter a book title.");
  }

  if (author.value.trim() === "") {
    return showError(author, "Please enter the author's name.");
  }

  if (genre.value === "") {
    return showError(genre, "Please choose a main genre.");
  }

  if (subgenre.value === "") {
    return showError(subgenre, "Please choose a subgenre.");
  }

  if (startDate.value === "") {
    return showError(startDate, "Please select a start date.");
  }

  if (endDate.value && new Date(endDate.value) < new Date(startDate.value)) {
    return showError(
      endDate,
      "End date cannot be earlier than the start date.",
    );
  }

  if (status.value === "") {
    return showError(status, "Please choose the reading status.");
  }

  if (rating.value === "") {
    return showError(rating, "Please rate this book.");
  }

  if (lesson.value.trim() === "") {
    return showError(lesson, "Please write your reflection.");
  }

  return true;
}

/* ===================================
   Genre Dropdown
=================================== */

function loadGenres() {
  genreSelect.innerHTML = `
    <option value="">Select Main Genre</option>
  `;

  Object.keys(GENRES)
    .sort()
    .forEach((genre) => {
      genreSelect.innerHTML += `
        <option value="${genre}">
          ${genre}
        </option>
      `;
    });
}

/* ===================================
   Subgenre Dropdown
=================================== */

function loadSubgenres(mainGenre) {
  subgenreSelect.innerHTML = `
    <option value="">Select Subgenre</option>
  `;

  if (!mainGenre) {
    subgenreSelect.innerHTML = `
      <option value="">
        Select Main Genre First
      </option>
    `;

    return;
  }

  const subgenres = GENRES[mainGenre];

  if (!subgenres) {
    return;
  }

  subgenres.forEach((subgenre) => {
    subgenreSelect.innerHTML += `
      <option value="${subgenre}">
        ${subgenre}
      </option>
    `;
  });
}

window.loadSubgenres = loadSubgenres;

/* ===================================
   Refresh UI
=================================== */

function refreshUI() {
  window.books = getBooks();

  renderLibrary();
  updateDashboard();
  updateGenreChart();
  updateStatusChart();
}

/* ===================================
   Clear Validation Error
=================================== */

document.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    field.classList.remove("error");
  });

  field.addEventListener("change", () => {
    field.classList.remove("error");
  });
});