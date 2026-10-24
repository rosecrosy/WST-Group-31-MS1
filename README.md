# 📚 Book Tracker

A browser-based interactive book tracking application developed for **MO-IT161 – Web Systems and Technology**.

The application allows users to organize their personal reading collection, record book information, monitor reading progress, and view reading statistics through an interactive dashboard.

---

## 👥 Project Information

| Information | Details |
|---|---|
| **Course** | MO-IT161 – Web Systems and Technology |
| **Program** | Bachelor of Science in Information Technology |
| **Milestone** | MS1: Interactive Frontend; MS2: Backend-Supported Application |
| **Group** | **Group 31** |
| **Academic Year** | 2026–2027 |

---

# 📌 Project Overview

**Book Tracker** is an interactive web application designed to help users organize and monitor their reading journey.

The application provides a centralized reading library where users can record books, track their reading status, add ratings and reflections, and view statistics about their reading collection.

The project applies **HTML, CSS, JavaScript, Node.js, and Express.js** to provide an interactive frontend and a backend that manages book records through a REST API.

The application was developed across two milestones:

- **Milestone 1 (MS1):** Interactive frontend web application.
- **Milestone 2 (MS2):** Backend-supported web application with persistent JSON-file storage.

---

# 🎯 Project Goal

The main goal of Book Tracker is to provide users with a simple and organized way to manage their personal reading collection and monitor their reading progress.

The project demonstrates the practical application of:

- HTML webpage structure
- CSS visual presentation
- JavaScript interactivity
- Form processing and validation
- Dynamic content rendering
- Frontend–backend communication
- REST API development
- Create, Read, Update, and Delete (CRUD) operations
- JSON-file data persistence
- Conditional interactions
- Data visualization
- Error handling and user feedback

---

# 👥 Intended Users

Book Tracker is intended for readers who want to:

- Organize their personal book collection
- Track books they are currently reading
- Keep records of completed books
- Record books they did not finish
- Maintain a to-read list
- Organize books by genre and subgenre
- Record ratings
- Write personal reflections
- View reading statistics

The interface is designed to keep reading information organized and understandable for general users.

---

# ✨ Application Features

## 1. 📊 Reading Dashboard

The Reading Dashboard provides an overview of the user's reading collection.

It dynamically displays:

- **Total Books**
- **Completed**
- **Reading**
- **DNF**
- **To Read**
- **Average Rating**

The displayed values are calculated from the current book records.

When books are added, edited, or deleted, the dashboard is refreshed to reflect the updated collection.

---

## 2. 📈 Reading Insights

The application provides visual summaries of the user's reading collection.

### Genre Distribution

A horizontal bar chart displays the number of books belonging to each main genre.

### Reading Status

A doughnut chart displays the distribution of:

- TBR
- Reading
- Completed
- DNF

If no books exist, the application displays an informative empty state instead of an empty chart.

---

## 3. ➕ Add a Book

Users can add a book through the **Add a Book** form.

### Book Information

Users can enter:

- Book Title
- Author
- Main Genre
- Subgenre
- Main Characters

### Reading Details

Users can enter:

- Start Date
- End Date
- Reading Status

### Review

Users can provide:

- Rating
- Reflection

The form is divided into logical sections to make information entry easier to understand.

---

## 4. 🏷️ Dynamic Genre and Subgenre Selection

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

## 5. ✅ Form Validation

The application validates the user's input before saving a book.

The validation checks:

- Book title
- Author
- Main genre
- Subgenre
- Start date
- End date
- Reading status
- Rating
- Reflection

The application also checks the relationship between the start and end dates.

An end date cannot be earlier than the start date.

When invalid information is entered:

1. The invalid field receives an error style.
2. The user receives a notification.
3. The invalid field receives focus so it can be corrected.

The backend also validates required book fields before accepting create and update requests.

This helps prevent incomplete or invalid book records from being saved.

---

## 6. 📚 Reading Library

The **My Reading Library** section displays saved books.

Each book card can display:

- Book title
- Author
- Reading status
- Main genre
- Subgenre
- Rating
- Reading dates
- Reflection

The library updates after adding, editing, or deleting a book.

Book records are retrieved through the backend API. If there are no saved books, an empty-state message is displayed.

---

## 7. ✏️ Edit Book

Users can edit an existing book record.

Selecting **Edit** loads the selected book's information into the form.

The following information can be edited:

- Title
- Author
- Start date
- End date
- Main genre
- Subgenre
- Reading status
- Rating
- Characters
- Reflection

When editing, the button label changes from:

```text
Save Book
```

to:

```text
Update Reading Journey
```

After the update is submitted successfully, the library and dashboard are refreshed.

The backend updates the existing record using its book ID instead of creating a separate record for the same book.

---

## 8. 🗑️ Delete Book

Users can remove a book from their reading library.

Before deletion, the application displays a confirmation dialog:

```text
Are you sure you want to remove this book from your bookshelf?
```

The book is only removed after the user confirms the action.

After deletion:

- The library is refreshed.
- Dashboard statistics are updated.
- Charts are updated.
- A notification confirms the removal.

This helps prevent accidental deletion.

---

## 9. 💭 Book Reflection

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

## 10. 🔔 User Feedback

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

Validation errors and unsuccessful backend requests also provide feedback to help users understand when an operation could not be completed.

---

# 💾 Data Storage

Book records are stored in **`data/books.json`** through the Express.js backend.

The frontend communicates with the server through the Fetch API using the functions in `js/bookService.js`.

The backend reads the JSON file when retrieving books and writes to it when books are added, updated, or deleted.

If the data directory or file does not exist, `server.js` creates it when the server starts.

### Current Storage Scope

- `data/books.json` is the primary storage for book records in MS2.
- Book records remain available after a server restart as long as the same data file is retained.
- The project does not use a database or external cloud storage.
- Data is stored on the computer running the server and is not automatically synchronized across devices.
- LocalStorage was part of the original MS1 implementation; it is no longer the primary storage mechanism for book records in MS2.

---

# 🏗️ Project Structure

```text
WST-Group-31-MS1/
├── index.html
├── style.css
├── README.md
├── package.json
├── package-lock.json
├── server.js
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

`server.js` also creates `data/books.json` automatically at startup if the data file is missing.

---

# 📂 File Responsibilities

| File | Responsibility |
|---|---|
| `index.html` | Defines the webpage structure, dashboard, forms, charts, and reading library. |
| `style.css` | Controls layout, colors, typography, cards, forms, buttons, and responsive styling. |
| `server.js` | Configures the Express server, REST API endpoints, JSON-file operations, and error handling. |
| `package.json` | Defines project metadata, dependencies, and the `npm start` command. |
| `package-lock.json` | Records installed dependency versions. |
| `data/books.json` | Stores book records persistently. |
| `js/app.js` | Coordinates form submission, validation, editing, deletion, and UI refreshes. |
| `js/bookService.js` | Sends asynchronous requests to the backend REST API. |
| `js/books.js` | Handles book cards and reading-library rendering. |
| `js/charts.js` | Creates and updates genre and reading-status charts. |
| `js/genres.js` | Stores main genre and subgenre data. |
| `js/storage.js` | Contains the existing storage utility; it is not the primary book-record storage in MS2. |
| `js/ui.js` | Supports user-interface functionality and notifications. |

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
Send POST Request
       ↓
Express API Processes Request
       ↓
Save Book to books.json
       ↓
Refresh Library
       ↓
Update Dashboard and Charts
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
Validate Input
       ↓
Send PUT Request
       ↓
Update Existing Record
       ↓
Refresh Library
       ↓
Update Dashboard and Charts
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
Send DELETE Request
       ↓
Remove Book from JSON File
       ↓
Refresh Library
       ↓
Update Dashboard and Charts
```

---

# 🧩 Implementation Dependencies

The MS2 application uses the following communication flow:

```text
HTML / CSS / Frontend JavaScript
               ↓
       js/bookService.js
            Fetch API
               ↓
        Express REST API
           server.js
               ↓
        data/books.json
```

- The frontend form and validation prepare book information before submitting a request.
- `js/bookService.js` sends `GET`, `POST`, `PUT`, and `DELETE` requests to the backend.
- Express.js parses JSON request bodies using `express.json()` and processes API requests.
- The API reads and writes `data/books.json` to retrieve or persist book records.
- The frontend refreshes the library, dashboard, and charts after successful operations.
- Chart.js is loaded through a CDN and is used for data visualization.

---

# 🛠️ Technologies Used

### Frontend

- **HTML5** — webpage structure
- **CSS3** — visual presentation and responsive layout
- **JavaScript** — application logic and interactivity
- **Chart.js** — data visualization
- **Google Fonts** — typography

### Backend

- **Node.js** — JavaScript runtime
- **Express.js** — server and REST API endpoints
- **Fetch API** — frontend-to-backend communication
- **JSON file storage** — persistent book records in `data/books.json`

### Development Tools

- **npm** — dependency management and start script
- **Visual Studio Code** — development environment
- **Git and GitHub** — version control and project repository

---

# 📋 Development Tasks

## Frontend Development (MS1)

- Create the HTML document structure and major webpage sections.
- Style the dashboard, forms, book cards, buttons, and responsive layout.
- Implement book creation, retrieval, editing, and deletion interactions.
- Implement form and date validation.
- Implement dynamic genre and subgenre selection.
- Implement reading dashboard calculations and charts.
- Implement reflections, toast notifications, delete confirmation, and empty states.

## Backend Development and Integration (MS2)

- Set up Node.js, npm, and Express.js.
- Create `server.js` and `data/books.json`.
- Implement `GET /api/books` to retrieve records.
- Implement `POST /api/books` to add records.
- Implement `PUT /api/books/:id` to update records.
- Implement `DELETE /api/books/:id` to delete records.
- Add request validation and error responses.
- Update `js/bookService.js` to use asynchronous API requests.
- Update the relevant book-management functions in `js/app.js`.
- Serve the existing frontend through the Express server.

## Testing and Refinement

- Test API creation, retrieval, updating, and deletion.
- Test frontend book creation, editing, and deletion.
- Check that saved records remain after restarting the server.
- Test invalid input and requests for nonexistent book IDs.
- Recheck genre and subgenre selection, dashboard cards, charts, reflection controls, and styling.
- Update the README and Browser-Based Application Development Workflow Worksheet.

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

### Backend Request Validation

The backend checks required information and returns appropriate error responses for invalid requests.

### Missing Book Handling

Requests to update or delete a book that does not exist return an HTTP `404` response.

### Empty States

The application provides meaningful messages when there are no books to display.

---

# 🎨 User Interface Design

The interface uses a clean, reading-focused visual design.

The design emphasizes:

- Clear section hierarchy
- Consistent spacing
- Readable typography
- Rounded cards
- Consistent buttons
- Clear form labels
- Status indicators
- Organized book cards
- Visual feedback
- Minimal visual clutter

The goal is to keep the application easy to understand while maintaining a consistent visual identity.

---

# 📱 Responsive Design

The application includes responsive layout rules to adapt the interface to different screen sizes.

Major areas such as:

- Dashboard cards
- Reading insights
- Forms
- Book library

use responsive layout techniques so the interface can adapt to smaller displays.

Responsive behavior should be checked during final refinement.

---

# 🧪 Testing and Evidence (MS2)

The following table documents the MS2 tests performed during development. Results reflect the tests completed in the working project and the fresh GitHub clone.

| Scenario | Expected Result | Actual Result | Status |
|---|---|---|---|
| Start server from fresh GitHub clone | Server starts and serves the website. | Dependencies were installed, and the server and website were started from a fresh clone. | **PASS** |
| Retrieve books (`GET /api/books`) | Returns a JSON array. | The empty collection returned `[]`; retrieval was also included in the CRUD test. | **PASS** |
| Add book (`POST /api/books`) | Returns the created record and saves it to the JSON file. | The API test created a test book, and the frontend test displayed a newly added book in the library. | **PASS** |
| Edit book (`PUT /api/books/:id`) | Updates the existing record without creating a duplicate. | The API test updated the test book's status, and the frontend edit test succeeded. | **PASS** |
| Delete book (`DELETE /api/books/:id`) | Removes the record and returns a success response. | The API test and frontend delete test succeeded. | **PASS** |
| Submit invalid data | Returns HTTP `400` with a validation error and does not save the invalid record. | The invalid-data submission test was performed and reported as passing. | **PASS** |
| Request a nonexistent book ID using `PUT` | Returns HTTP `404` with a “Book not found” error. | Tested using a deliberately nonexistent book ID; the test passed. | **PASS** |
| Request a nonexistent book ID using `DELETE` | Returns HTTP `404` with a “Book not found” error. | Tested using a deliberately nonexistent book ID; the test passed. | **PASS** |
| Restart server after saving a book | The saved record remains available after restart. | The test book remained visible after the server was restarted. | **PASS** |
| Check frontend regression features | Genre/subgenre selection, dashboard, charts, reflection controls, and styling still work. | These features were checked after connecting the frontend to the API. | **PASS** |

### Error-Path Test Results

Invalid book data and requests to update or delete a nonexistent book ID were tested.

The expected responses were:

- **HTTP `400 Bad Request`** for invalid book data.
- **HTTP `404 Not Found`** for update and delete requests involving a nonexistent book ID.

The CRUD and restart-persistence tests were performed in the working project. A fresh clone of the GitHub repository was also started to verify that the committed server, website, and API could run.

Screenshots or terminal output may be retained as supporting evidence if required by the instructor.

---

# 🔍 Milestone 1 Alignment

Book Tracker was developed to address the main requirements of **Milestone 1: Interactive Frontend Web Application**.

| Milestone Requirement | Book Tracker Implementation |
|---|---|
| Meaningful webpage structure using HTML | Dashboard, Reading Insights, Add a Book, Reading Library, and footer sections |
| Organized visual presentation using CSS | Consistent layout, typography, cards, forms, buttons, spacing, and responsive styling |
| Interactive functionality using JavaScript | Form processing, validation, CRUD interactions, dynamic genres, dashboard updates, charts, reflections, and notifications |
| Alignment with application purpose | Features focus on organizing books and tracking reading activity |
| Evidence of review and refinement | Validation, confirmation dialogs, empty states, feedback messages, dynamic interactions, and UI refinements |

---

# ⚙️ Milestone 2 Alignment — Backend-Supported Web Application

Milestone 2 extends the MS1 frontend by implementing a lightweight backend-supported feature: persistent book management using Node.js, Express.js, a REST API, and a JSON file.

| MS2 Requirement | Book Tracker Implementation |
|---|---|
| Meaningful frontend–backend integration | The frontend sends asynchronous requests through `js/bookService.js` to the Express API. |
| At least one backend-supported feature | Book records can be created, retrieved, updated, and deleted through REST endpoints. |
| Information storage and processing | `server.js` reads and writes records in `data/books.json`. |
| Testing and refinement | CRUD operations, restart persistence, invalid-data handling, and nonexistent-ID `PUT` and `DELETE` responses were tested. |
| Alignment with project purpose | Backend support strengthens the existing reading-library functionality without changing the application's main purpose. |
| Lightweight scope | The project uses local JSON-file storage and does not introduce authentication, a remote database, or multi-user accounts. |

## REST API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/books` | Retrieve all books. |
| `POST` | `/api/books` | Add a new book. |
| `PUT` | `/api/books/:id` | Update an existing book. |
| `DELETE` | `/api/books/:id` | Delete a book by ID. |

---

# 📋 Scope Review

## Included in the Current Implementation

- Existing MS1 reading dashboard, charts, and user interface.
- Book creation, retrieval, updating, and deletion.
- Genre and subgenre selection, reading status, dates, ratings, and reflections.
- Frontend validation, notifications, delete confirmation, and empty states.
- Express.js backend and REST API integration.
- Persistent book records in `data/books.json`.
- Backend request validation and error handling.
- Testing for core CRUD operations and server-restart persistence.

## Outside the Current Scope

- Complete authentication systems
- Database-driven platforms
- Multi-user account management
- Cloud synchronization
- Enterprise-scale backend architecture
- Online book database integration

These features are outside the intended lightweight scope of MS2.

---

# 🔮 Future Improvements

Potential future improvements include:

- Search functionality
- Book filtering
- Sorting options
- Book cover images
- Reading goals
- Monthly reading statistics
- Yearly reading statistics
- Data export
- Cloud database integration
- User accounts
- Authentication
- Multi-device synchronization

These features are documented as potential future improvements rather than current functionality.

---

# 🚀 Running the Project

## Requirements

- Node.js and npm
- A modern web browser
- Git, if cloning the repository
- An internet connection for externally loaded resources such as Chart.js

## Steps

### 1. Clone the Repository

```bash
git clone https://github.com/rosecrosy/WST-Group-31-MS1.git
```

### 2. Enter the Project Folder

```bash
cd WST-Group-31-MS1
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Express Server

```bash
npm start
```

### 5. Open the Application

Open the following address in your browser:

**http://localhost:3000**

To check the API directly, visit:

**http://localhost:3000/api/books**

The endpoint should return the saved book records as a JSON array, or `[]` if the collection is empty.

**Important:** Use the Express server to run the application. Live Server alone does not run the backend API.

The server creates `data/books.json` automatically if the file does not exist.

---

# 📌 Project Status

**Milestone 1:** Interactive Frontend Web Application — completed and retained.

**Milestone 2:** Backend-Supported Web Application — implemented with an Express.js REST API, JSON-file storage, frontend integration, and documented testing results.

**Project Type:** Browser-Based Web Application with Backend Support

**Group:** Group 31

**Repository:** https://github.com/rosecrosy/WST-Group-31-MS1

---

# 📜 Academic Project

**Course:** MO-IT161 – Web Systems and Technology

**Program:** Bachelor of Science in Information Technology

**Milestone:** Milestone 1 – Interactive Frontend Web Application; Milestone 2 – Backend-Supported Web Application

**Group:** **Group 31**

**Academic Year:** 2026–2027

---

> **Book Tracker — Organize your reading journey, one book at a time.**
