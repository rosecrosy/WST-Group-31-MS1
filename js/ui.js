/* ===================================
   Date Formatter
=================================== */

/* ===================================
   Smart Date Formatter
=================================== */

function formatReadingDates(startDate, endDate) {
  if (!startDate && !endDate) {
    return "—";
  }

  if (startDate && !endDate) {
    return formatSingleDate(startDate);
  }

  if (!startDate && endDate) {
    return formatSingleDate(endDate);
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const sameYear = start.getFullYear() === end.getFullYear();

  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  if (sameMonth) {
    return `${start.toLocaleDateString("en-US", {
      month: "short",
    })} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`;
  }

  if (sameYear) {
    return `${formatSingleDateWithoutYear(start)} → ${formatSingleDate(end)}`;
  }

  return `${formatSingleDate(start)} → ${formatSingleDate(end)}`;
}

/* ===================================
   Single Date Formatter
=================================== */

function formatSingleDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",

    day: "numeric",

    year: "numeric",
  });
}

function formatSingleDateWithoutYear(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",

    day: "numeric",
  });
}

function createBookCard(book) {
  return `
<article class="book-card">

<div class="book-header">

    <h3>${book.title}</h3>

    <span class="book-status ${book.status.toLowerCase().replace(/\s+/g, "-")}">
        ${book.status}
    </span>

</div>

    <p class="book-author">
        ${book.author}
    </p>

    <div class="book-tags">

        <span class="tag">
        📚 ${book.genre || "Unknown Genre"}
        </span>

        ${
          book.subgenre
            ? `
            <span class="tag subgenre-tag">
              🌿 ${book.subgenre}
            </span>
            `
            : ""
        }

        <span class="tag">
           ${book.rating}
        </span>

    </div>

<p class="reading-date">

    📅
    ${formatReadingDates(book.startDate, book.endDate)}

</p>

    <div class="reflection-section">

        <button
            class="reflection-toggle"
            onclick="toggleReflection('${book.id}')">

            ▼ Read Lesson

        </button>

        <div
            id="reflection-${book.id}"
            class="reflection-content">

            <h4>💭 Lesson</h4>

            <p>${book.lesson || "No reflection added yet."}</p>

        </div>

    </div>

 <div class="book-actions">

    <button
        class="edit-btn"
        onclick="startEditing('${book.id}')">

        ✏️ Edit

    </button>

    <button
        class="delete-btn"
        onclick="deleteBook('${book.id}')">

        🗑 Delete

    </button>

</div>

</article>
`;
}

function renderLibrary() {
  const library = document.getElementById("bookLibrary");
  const books = window.books;

  if (books.length === 0) {
    library.innerHTML = `
      <div class="empty-state">
        🌿
        <h3>No books yet</h3>
        <p>Your reading journey begins here.</p>
      </div>
    `;

    return;
  }

  library.innerHTML = books.map(createBookCard).join("");
}

function toggleReflection(bookId) {
  const reflection = document.getElementById(`reflection-${bookId}`);

  const button = reflection.previousElementSibling;

  const isOpen = reflection.classList.contains("show");

  if (isOpen) {
    reflection.classList.remove("show");

    button.textContent = "▼ Read Lesson";
  } else {
    reflection.classList.add("show");

    button.textContent = "▲ Hide Lesson";
  }
}

function showToast(title, message) {
  const container = document.getElementById("toastContainer");

  const toast = document.createElement("div");

  toast.className = "toast";

  toast.innerHTML = `
    <h4>${title}</h4>
    <p>${message}</p>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-hide");

    setTimeout(() => {
      toast.remove();
    }, 350);
  }, 3000);
}

function updateDashboard() {
  const books = window.books;

  const totalBooks = books.length;

  const completedBooks = books.filter(
    (book) => book.status === "Completed",
  ).length;

  const readingBooks = books.filter((book) => book.status === "Reading").length;

  const didnotfinishBooks = books.filter(
    (book) => book.status === "DNF",
  ).length;

  const toReadBooks = books.filter((book) => book.status === "TBR").length;

  const ratedBooks = books.filter((book) => book.rating);

  const totalStars = ratedBooks.reduce((total, book) => {
    return total + (book.rating.match(/⭐/g)?.length || 0);
  }, 0);

  const averageRating =
    ratedBooks.length === 0 ? 0 : (totalStars / ratedBooks.length).toFixed(1);

  document.getElementById("totalBooks").textContent = totalBooks;

  document.getElementById("completedBooks").textContent = completedBooks;

  document.getElementById("readingBooks").textContent = readingBooks;

  document.getElementById("didnotfinishBooks").textContent = didnotfinishBooks;

  document.getElementById("toReadBooks").textContent = toReadBooks;

  document.getElementById("averageRating").textContent = `⭐ ${averageRating}`;
}

function startEditing(bookId) {
  const books = window.books;

  const selectedBook = books.find((book) => book.id === bookId);

  if (!selectedBook) return;

  window.editingBookId = bookId;

  document.getElementById("title").value = selectedBook.title;
  document.getElementById("author").value = selectedBook.author;
  document.getElementById("startDate").value = selectedBook.startDate;
  document.getElementById("endDate").value = selectedBook.endDate;
  document.getElementById("genre").value = selectedBook.genre;
  // Populate the subgenre dropdown first
  loadSubgenres(selectedBook.genre);
  // Then select the saved subgenre
  document.getElementById("subgenre").value = selectedBook.subgenre;
  document.getElementById("status").value = selectedBook.status;
  document.getElementById("rating").value = selectedBook.rating;
  document.getElementById("characters").value = selectedBook.characters;
  document.getElementById("lesson").value = selectedBook.lesson;

  document.getElementById("saveBookBtn").textContent =
    "💾 Update Reading Journey";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function deleteBook(bookId) {
  window.deleteBookHandler(bookId);
}