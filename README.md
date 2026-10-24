# 📚 Book Tracker

A browser-based interactive book tracking application developed for **MO-IT161 – Web Systems and Technology**.

The application allows users to organize their personal reading collection, record book information, monitor reading progress, and view reading statistics through an interactive dashboard.

---

## 👥 Project Information

| Information       | Details                                            |
| ----------------- | -------------------------------------------------- |
| **Course**        | MO-IT161 – Web Systems and Technology              |
| **Program**       | Bachelor of Science in Information Technology      |
| **Milestone**     | Milestone 1 – Interactive Frontend Web Application |
| **Group**         | **Group 31**                                       |
| **Academic Year** | 2026–2027                                          |

---

# 📌 Project Overview

**Book Tracker** is an interactive frontend web application designed to help users organize and monitor their reading journey.

The application provides a centralized reading library where users can record books, track their reading status, add ratings and reflections, and view statistics about their reading collection.

The project applies **HTML, CSS, and JavaScript** to create a functional browser-based application with dynamic content and user interactions.

---

# 🎯 Project Goal

The main goal of Book Tracker is to provide users with a simple and organized way to manage their personal reading collection and monitor their reading progress.

The project aims to demonstrate the practical application of:

* HTML webpage structure
* CSS visual presentation
* JavaScript interactivity
* Form processing
* Input validation
* Dynamic content rendering
* LocalStorage data persistence
* CRUD operations
* Conditional interactions
* Data visualization
* User feedback

---

# 👥 Intended Users

Book Tracker is intended for readers who want to:

* Organize their personal book collection
* Track books they are currently reading
* Keep records of completed books
* Record books they did not finish
* Maintain a to-read list
* Organize books by genre and subgenre
* Record ratings
* Write personal reflections
* View reading statistics

The interface is designed to keep reading information organized and understandable for general users.

---

# ✨ Application Features

## 1. 📊 Reading Dashboard

The Reading Dashboard provides an overview of the user's reading collection.

It dynamically displays:

* **Total Books**
* **Completed**
* **Reading**
* **DNF**
* **To Read**
* **Average Rating**

The displayed values are calculated from the current book records.

When books are added, edited, or deleted, the dashboard is refreshed to reflect the updated collection.

---

# 2. 📈 Reading Insights

The application provides visual summaries of the user's reading collection.

### Genre Distribution

A horizontal bar chart displays the number of books belonging to each main genre.

### Reading Status

A doughnut chart displays the distribution of:

* TBR
* Reading
* Completed
* DNF

If no books exist, the application displays an informative empty state instead of an empty chart.

---

# 3. ➕ Add a Book

Users can add a book through the **Add a Book** form.

### Book Information

Users can enter:

* Book Title
* Author
* Main Genre
* Subgenre
* Main Characters

### Reading Details

Users can enter:

* Start Date
* End Date
* Reading Status

### Review

Users can provide:

* Rating
* Reflection

The form is divided into logical sections to make information entry easier to understand.

---

# 4. 🏷️ Dynamic Genre and Subgenre Selection

The application provides a dynamic genre and subgenre system.

Users first select a **Main Genre**.

The application then dynamically loads the corresponding subgenres.

For example:

```text
Main Genre: Manga

Subgenres:
- Shonen
- Shojo
- Seinen
- Josei
- Isekai
- Slice of Life
- Sports
- Romance
- Fantasy
- Horror
```

The subgenre list changes depending on the selected main genre.

This prevents users from selecting a subgenre before selecting its corresponding main genre.

---

# 5. ✅ Form Validation

The application validates the user's input before saving a book.

The validation checks:

* Book title
* Author
* Main genre
* Subgenre
* Start date
* End date
* Reading status
* Rating
* Reflection

The application also checks the relationship between the start and end dates.

An end date cannot be earlier than the start date.

When invalid information is entered:

1. The invalid field receives an error style.
2. The user receives a notification.
3. The invalid field receives focus so it can be corrected.

This helps prevent incomplete or invalid book records from being saved.

---

# 6. 📚 Reading Library

The **My Reading Library** section displays saved books.

Each book card can display:

* Book title
* Author
* Reading status
* Main genre
* Subgenre
* Rating
* Reading dates
* Reflection

The library updates automatically after adding, editing, or deleting a book.

If there are no saved books, an empty-state message is displayed.

---

# 7. ✏️ Edit Book

Users can edit an existing book record.

Selecting **Edit** loads the selected book's information into the form.

The following information can be edited:

* Title
* Author
* Start date
* End date
* Main genre
* Subgenre
* Reading status
* Rating
* Characters
* Reflection

When editing:

```text
Save Book
```

changes to:

```text
Update Reading Journey
```

After the update is submitted, the library and dashboard are refreshed.

---

# 8. 🗑️ Delete Book

Users can remove a book from their reading library.

Before deletion, the application displays a confirmation dialog:

```text
Are you sure you want to remove this book from your bookshelf?
```

The book is only removed after the user confirms the action.

After deletion:

* The library is refreshed.
* Dashboard statistics are updated.
* Charts are updated.
* A notification confirms the removal.

This helps prevent accidental deletion.

---

# 9. 💭 Book Reflection

Users can write a reflection about each book.

The reflection is hidden by default to keep the book card organized.

Users can select:

```text
▼ Read Lesson
```

to display the reflection.

The control changes to:

```text
▲ Hide Lesson
```

when the reflection is expanded.

This keeps additional information available without making every book card unnecessarily long.

---

# 10. 🔔 User Feedback

The application provides toast notifications after important actions.

Examples include:

### Book Added

```text
Book Added
"The book" has been added to your reading library.
```

### Book Updated

```text
Reading Journey Updated
"The book" has been updated successfully.
```

### Book Removed

```text
Book Removed
The book has been removed from your bookshelf.
```

Validation errors also provide feedback when required information is missing or invalid.

---

# 💾 Data Storage

Book records are stored using the browser's **LocalStorage API**.

The application uses a dedicated `bookService.js` module for book data operations.

The service provides:

```text
getBooks()
addBook()
updateBook()
deleteBook()
```

The storage layer separates book data management from the main application logic.

### Current Storage Scope

The current milestone uses browser-based LocalStorage.

Therefore:

* Data is stored locally in the browser.
* No backend server is currently required.
* No remote database is currently used.
* Data is associated with the browser/device where it was saved.

---

# 🏗️ Project Structure

```text
Book-Tracker/
│
├── index.html
├── style.css
│
└── js/
    ├── app.js
    ├── bookService.js
    ├── books.js
    ├── charts.js
    ├── genres.js
    └── ui.js
```

---

# 📂 File Responsibilities

| File             | Responsibility                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `index.html`     | Defines the main webpage structure, dashboard, forms, charts, and library                     |
| `style.css`      | Controls layout, colors, typography, cards, forms, buttons, and responsive styling            |
| `app.js`         | Coordinates form submission, validation, genre interaction, and UI refresh                    |
| `bookService.js` | Handles LocalStorage-based book data operations                                               |
| `books.js`       | Handles book cards, library rendering, reflections, dashboard calculations, and notifications |
| `charts.js`      | Creates and updates genre and reading-status charts                                           |
| `genres.js`      | Stores the main genre and subgenre data                                                       |
| `ui.js`          | Supports user-interface functionality                                                         |

---

# 🔄 Application Workflow

## Adding a Book

```text
Open Book Tracker
       ↓
Open Add a Book
       ↓
Enter Book Information
       ↓
Select Main Genre
       ↓
Select Subgenre
       ↓
Enter Reading Details
       ↓
Add Rating and Reflection
       ↓
Save Book
       ↓
Validate Input
       ↓
Store Book
       ↓
Update Library
       ↓
Update Dashboard
       ↓
Update Charts
```

---

## Editing a Book

```text
My Reading Library
       ↓
Select Edit
       ↓
Load Existing Book Information
       ↓
Modify Information
       ↓
Update Reading Journey
       ↓
Save Changes
       ↓
Update Library
       ↓
Update Dashboard
       ↓
Update Charts
```

---

## Deleting a Book

```text
My Reading Library
       ↓
Select Delete
       ↓
Confirmation Dialog
       ↓
Confirm Deletion
       ↓
Remove Book
       ↓
Update Library
       ↓
Update Dashboard
       ↓
Update Charts
```

---

# 🧩 Implementation Dependencies

The application is organized into multiple frontend components.

```text
HTML
 ↓
CSS
 ↓
JavaScript
 ↓
LocalStorage
```

The main application coordinates the JavaScript modules:

```text
app.js
 ├── bookService.js
 ├── books.js
 ├── charts.js
 └── genres.js
```

### External Dependency

The application uses **Chart.js** for data visualization.

Chart.js is loaded through a CDN in the HTML file.

---

# 🛠️ Technologies Used

* **HTML5** — webpage structure
* **CSS3** — visual presentation and responsive layout
* **JavaScript** — application logic and interactivity
* **LocalStorage API** — browser-based data persistence
* **Chart.js** — data visualization
* **Google Fonts** — typography
* **GitHub** — source-code repository
* **Visual Studio Code** — development environment

---

# 📋 Development Tasks

The frontend development was organized into the following major task areas.

## Structure Development

* Create the HTML document structure
* Create the dashboard
* Create the reading insights section
* Create the Add a Book form
* Create the reading library
* Create empty states
* Organize the page into logical sections

## Styling Development

* Establish the visual theme
* Define colors and typography
* Design dashboard cards
* Style forms and inputs
* Design book cards
* Style status indicators
* Design buttons
* Add hover and interaction states
* Implement responsive layouts

## Functionality Development

* Implement book creation
* Implement book retrieval
* Implement book updating
* Implement book deletion
* Implement LocalStorage persistence
* Implement form validation
* Implement date validation
* Implement dynamic genre selection
* Implement dynamic subgenre selection
* Implement dashboard calculations
* Implement genre chart
* Implement status chart
* Implement reflection toggle
* Implement toast notifications
* Implement delete confirmation

## Testing and Refinement

* Test valid book submission
* Test incomplete form submission
* Test genre and subgenre interaction
* Test date validation
* Test book editing
* Test book deletion
* Test delete confirmation
* Test dashboard updates
* Test chart updates
* Test reflection interaction
* Test LocalStorage persistence
* Review visual consistency
* Refine user feedback

---

# 🛡️ Error Prevention

Book Tracker includes several mechanisms designed to prevent incorrect user actions.

### Required Field Validation

Important book information must be provided before the record can be saved.

### Date Validation

The application checks that the end date is not earlier than the start date.

### Dynamic Subgenre Selection

The subgenre field depends on the selected main genre.

### Delete Confirmation

Users must confirm before a book is deleted.

### Visual Error State

Invalid fields receive a visible error style.

### Empty States

The application provides meaningful messages when there are no books to display.

---

# 🎨 User Interface Design

The interface uses a clean, reading-focused visual design.

The design emphasizes:

* Clear section hierarchy
* Consistent spacing
* Readable typography
* Rounded cards
* Consistent buttons
* Clear form labels
* Status indicators
* Organized book cards
* Visual feedback
* Minimal visual clutter

The goal is to keep the application easy to understand while maintaining a consistent visual identity.

---

# 📱 Responsive Design

The application includes responsive layout rules to adapt the interface to different screen sizes.

Major areas such as:

* Dashboard cards
* Reading insights
* Forms
* Book library

use responsive layout techniques so the interface can adapt to smaller displays.

Responsive behavior should be tested before final submission.

---

# 🧪 Testing Checklist

The following scenarios should be tested before submission:

### Book Creation

* [ ] Add a valid book
* [ ] Verify the book appears in the library
* [ ] Verify dashboard values update
* [ ] Verify charts update

### Validation

* [ ] Submit with an empty title
* [ ] Submit with an empty author
* [ ] Submit without a genre
* [ ] Submit without a subgenre
* [ ] Submit without a start date
* [ ] Submit without a status
* [ ] Submit without a rating
* [ ] Submit without a reflection
* [ ] Enter an end date earlier than the start date

### Genre Interaction

* [ ] Select a main genre
* [ ] Verify its subgenres appear
* [ ] Change the main genre
* [ ] Verify the subgenre list updates
* [ ] Verify the subgenre resets appropriately

### Editing

* [ ] Select Edit
* [ ] Verify existing information loads
* [ ] Change information
* [ ] Save the update
* [ ] Verify the updated information appears

### Deletion

* [ ] Select Delete
* [ ] Cancel deletion
* [ ] Confirm deletion
* [ ] Verify the book disappears
* [ ] Verify dashboard values update
* [ ] Verify charts update

### Other Interactions

* [ ] Expand a reflection
* [ ] Collapse a reflection
* [ ] Refresh the browser
* [ ] Verify stored books remain available
* [ ] Test the application on different screen sizes

---

# 🔍 Milestone 1 Alignment

Book Tracker was developed to address the main requirements of the **Milestone 1: Interactive Frontend Web Application**.

| Milestone Requirement                      | Book Tracker Implementation                                                                                             |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Meaningful webpage structure using HTML    | Dashboard, Reading Insights, Add a Book, Reading Library, and footer sections                                           |
| Organized visual presentation using CSS    | Consistent layout, typography, cards, forms, buttons, spacing, and responsive styling                                   |
| Interactive functionality using JavaScript | Form processing, validation, CRUD operations, dynamic genres, dashboard updates, charts, reflections, and notifications |
| Alignment with application purpose         | Features focus on organizing books and tracking reading activity                                                        |
| Evidence of review and refinement          | Validation, confirmation dialogs, empty states, feedback messages, dynamic interactions, and UI refinements             |

---

# 📋 Scope Review

## Included in the Current Milestone

The current frontend scope includes:

* Interactive book tracking
* Add book functionality
* Edit book functionality
* Delete book functionality
* LocalStorage persistence
* Genre selection
* Dynamic subgenre selection
* Reading status tracking
* Ratings
* Reflections
* Dashboard statistics
* Genre visualization
* Reading-status visualization
* Input validation
* Delete confirmation
* Toast notifications
* Empty states

## Outside the Current Scope

The following are not currently implemented:

* Backend server
* Remote database
* User authentication
* Multi-user accounts
* Cloud synchronization
* Online book database integration

These features may be considered as future improvements rather than part of the current frontend milestone.

---

# 🔮 Future Improvements

Potential future improvements include:

* Search functionality
* Book filtering
* Sorting options
* Book cover images
* Reading goals
* Monthly reading statistics
* Yearly reading statistics
* Data export
* Cloud database integration
* User accounts
* Authentication
* Multi-device synchronization

These features are intentionally documented as future improvements rather than current functionality.

# 🚀 Running the Project

## Requirements

* Modern web browser
* JavaScript enabled
* LocalStorage enabled
* Internet connection for the Chart.js CDN

## Steps

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Open the project using a local development server.
4. Open the application in a modern web browser.
5. Add books and test the interactive features.

---


---

# 🚀 Milestone 2 – Backend-Supported Web Application

## Overview

For Milestone 2 of MO-IT161 – Web Systems and Technology, Book Tracker was enhanced with a lightweight backend using **Node.js and Express.js**.

The purpose of this milestone is to integrate the existing frontend with a backend API, enabling book records to be created, retrieved, updated, and deleted through server-side operations.

The original Book Tracker features and user interface have been retained while replacing browser-based book storage with backend-supported data persistence.

## Backend-Supported Features

The application now supports the following backend operations:

- **Retrieve Books** – Fetches saved book records from the backend.
- **Add Books** – Accepts new book records through an API request.
- **Update Books** – Modifies existing book records.
- **Delete Books** – Removes selected book records.
- **Persistent Storage** – Stores book records in a local JSON file.
- **Request Validation** – Checks required book information before saving.
- **Error Handling** – Returns appropriate HTTP status codes and JSON error messages for invalid requests and missing records.

## Technologies Used

- **Node.js** – JavaScript runtime for the backend.
- **Express.js** – Handles API routes and HTTP requests.
- **JavaScript Fetch API** – Connects the frontend to the backend.
- **JSON File Storage** – Stores book records in `data/books.json`.
- **GitHub** – Version control and project repository.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api` | Checks whether the API is running. |
| GET | `/api/books` | Retrieves all book records. |
| POST | `/api/books` | Adds a new book record. |
| PUT | `/api/books/:id` | Updates an existing book record. |
| DELETE | `/api/books/:id` | Deletes a book record. |

## Data Persistence

Book records are stored in `data/books.json`, allowing the application to retain saved records beyond the current browser session.

The backend reads and writes this file when book records are retrieved or modified. The data file is generated automatically by the server when it does not yet exist.

**Storage limitation:** The current implementation uses local JSON file storage rather than a cloud database. The records are stored on the computer running the server and are not automatically synchronized across devices.

## Frontend–Backend Integration

The frontend communicates with the Express.js API through the Fetch API.

The `bookService.js` module handles asynchronous requests for retrieving, adding, updating, and deleting book records. The main application uses these operations to refresh the reading library, dashboard statistics, and charts after changes.

This structure separates data operations from the main user interface logic and demonstrates communication between frontend and backend technologies.

## Testing and Refinement

The backend-supported application was tested using multiple scenarios:

- Adding, retrieving, updating, and deleting book records.
- Checking whether records remain available after browser refreshes.
- Verifying data persistence after server restarts.
- Submitting a book with an empty title.
- Attempting to update or delete nonexistent book records.
- Sending malformed JSON requests.
- Regression testing existing features, including genre and subgenre selection, reading status, ratings, reflections, and dashboard charts.

Testing confirmed that the main book management operations work as intended and that invalid requests receive appropriate error responses.

## How to Run the Application

1. Install [Node.js](https://nodejs.org/).
2. Download or clone this repository.
3. Open the project folder in a terminal.
4. Install the project dependencies:

   ```bash
   npm install
   ```

5. Start the Express server:

   ```bash
   node server.js
   ```

6. Open the application at:

   `http://localhost:3000`

   Keep the server running while using the application.

## Project Structure – Milestone 2

```text
Book-Tracker/
├── index.html
├── style.css
├── server.js
├── package.json
├── package-lock.json
├── README.md
├── data/
│   └── books.json
└── js/
    ├── app.js
    ├── bookService.js
    ├── books.js
    ├── charts.js
    ├── genres.js
    ├── storage.js
    └── ui.js
```

The `data/books.json` file is created by the server when needed and is excluded from version control. The project source code and dependency files should be committed to GitHub.

## Milestone 2 Outcome

Milestone 2 builds on the interactive frontend developed in Milestone 1 by introducing backend-supported book management and persistent file storage.

The implementation demonstrates frontend–backend integration, asynchronous API requests, basic server-side validation, error handling, and testing while keeping the application lightweight and aligned with its original purpose.


## 📜 Academic Project

**Course:** MO-IT161 – Web Systems and Technology
**Program:** Bachelor of Science in Information Technology
**Milestone:** 
Milestone 1 – Interactive Frontend Web Application 
Milestone 2 – Backend-Supported Web Application
**Group:** **Group 31**
**Academic Year:** 2026–2027

---

> **Book Tracker — Organize your reading journey, one book at a time.**
