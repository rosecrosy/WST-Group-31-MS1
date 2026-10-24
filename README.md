# 📚 Book Tracker

A browser-based interactive book tracking application developed for **MO-IT161 – Web Systems and Technology**.

Book Tracker helps users organize their personal reading collection, track reading progress, record ratings and reflections, and view reading statistics through an interactive dashboard.

The project is developed across two milestones:

- **Milestone 1 (MS1):** Interactive frontend web application built with HTML, CSS, and JavaScript.
- **Milestone 2 (MS2):** Backend development using Node.js, Express.js, and a JSON file for persistent book storage, integrated with the existing frontend.

---

## 📌 Project Information

| Information | Details |
|---|---|
| Course | MO-IT161 – Web Systems and Technology |
| Program | Bachelor of Science in Information Technology |
| Group | Group 31 |
| Academic Year | 2026–2027 |
| MS1 | Interactive Frontend Web Application |
| MS2 | Backend Development and Frontend Integration |
| Project Type | Full-Stack Web Application |

---

## 🎯 Project Objectives

Book Tracker aims to provide an organized and user-friendly way to manage a personal reading collection.

The project demonstrates the development of an interactive frontend, backend API integration, data validation, CRUD operations, and persistent storage.

The application allows users to:

- Organize books by genre and subgenre.
- Track reading status and reading dates.
- Add ratings and personal reflections.
- Create, view, edit, and delete book records.
- Monitor reading progress using dashboard statistics and charts.
- Save book records to a JSON file through a backend REST API.

---

# 🖥️ Milestone 1 — Interactive Frontend Web Application

Milestone 1 focused on building the interactive user interface and implementing the core book-tracking features.

### Frontend Features

**Reading Dashboard**
- Displays total books, completed books, books currently being read, DNF books, books to read, and average rating.
- Updates statistics when the book collection changes.

**Reading Insights**
- Displays genre distribution through a horizontal bar chart.
- Displays reading-status distribution through a doughnut chart.
- Provides an empty state when there are no books to display.

**Book Management**
- Add new books through a form.
- View saved books in the reading library.
- Edit existing book information.
- Delete books with a confirmation dialog.

**Book Information**

Each book can contain:

- Title and author
- Main genre and subgenre
- Main characters
- Start date and end date
- Reading status
- Rating
- Personal reflection

**Dynamic Genre Selection**
- Loads subgenres based on the selected main genre.
- Resets the subgenre selection when appropriate.

**Form Validation and User Feedback**
- Validates required book information.
- Checks reading dates.
- Displays validation feedback and toast notifications.
- Provides meaningful empty states and delete confirmation.

**User Interface**
- Maintains the existing Book Tracker design.
- Uses organized sections, forms, book cards, dashboard cards, and charts.
- Includes responsive styling for different screen sizes.

---

# ⚙️ Milestone 2 — Backend Development

Milestone 2 extends the existing frontend by introducing a backend server and connecting the book-management functionality to a REST API.

### Backend Technologies

| Technology | Purpose |
|---|---|
| Node.js | Runs JavaScript on the server |
| Express.js | Creates the server and REST API endpoints |
| REST API | Enables communication between the frontend and backend |
| JSON file | Stores book records persistently |
| `fs/promises` | Reads and writes the JSON data file |
| `crypto` | Generates unique identifiers for new book records |

### Backend Features

**1. Book Creation**

The frontend sends a request to the API when a user adds a book. The backend validates the request, creates the book record, and saves it to the JSON file.

**2. Book Retrieval**

The frontend requests saved book records from the backend. Retrieved records are used to display the reading library and update dashboard statistics and charts.

**3. Book Updating**

The backend locates an existing book by its ID and saves its updated information without creating a duplicate record.

**4. Book Deletion**

The backend removes the selected book record from the JSON file and returns a response confirming the operation.

**5. Persistent Storage**

Book records are stored in `data/books.json`. The records remain available after the Node.js server stops and starts again, provided the same data file is retained.

**6. Request Validation and Error Handling**

The API validates required book fields and provides appropriate responses for invalid requests, missing book records, and server errors.

**7. Frontend Integration**

The existing frontend communicates with the backend through `js/bookService.js`. The visual design and unrelated frontend features are retained.

---

## 🔌 REST API Endpoints

The backend provides the following endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/books` | Retrieve all books |
| `POST` | `/api/books` | Add a new book |
| `PUT` | `/api/books/:id` | Update an existing book |
| `DELETE` | `/api/books/:id` | Delete a book by ID |

### API Request and Response Behavior

- `GET /api/books` returns a JSON array of book records.
- `POST /api/books` returns the created book and an HTTP `201` status when successful.
- `PUT /api/books/:id` returns the updated book when successful.
- `DELETE /api/books/:id` returns a success message when the record is deleted.
- Invalid requests return an error response.
- Requests for book IDs that do not exist return an HTTP `404` response.

### Book Data Structure

Book records follow the existing frontend data structure.

```json
{
  "id": "unique-book-id",
  "title": "Example Book",
  "author": "Example Author",
  "startDate": "2026-10-24",
  "endDate": "",
  "genre": "Fantasy",
  "subgenre": "High Fantasy",
  "status": "Reading",
  "rating": 5,
  "characters": "Example Character",
  "lesson": "Personal reading reflection",
  "createdAt": "2026-10-24T12:00:00.000Z"
}
```

The example above illustrates the record structure. Actual records use the values entered through the application.

---

## 💾 Data Storage

The current implementation uses a JSON file for book records instead of browser `localStorage` as the primary storage mechanism.

**Storage file:** `data/books.json`

The file starts with an empty JSON array:

```json
[]
```

When books are added, updated, or deleted, the backend writes the changes to this file.

This approach provides persistent storage across server restarts without requiring a separate database or external cloud-storage service.

### Storage Scope

- Book records are managed through the REST API.
- The JSON file stores the book collection.
- The application does not use a remote database.
- User authentication and cloud synchronization are not included in the current scope.

---

## 🏗️ Project Structure

```text
WST-Group-31-MS1/
│
├── index.html
├── style.css
├── README.md
├── package.json
├── package-lock.json
├── server.js
│
├── data/
│   └── books.json
│
└── js/
    ├── app.js
    ├── bookService.js
    ├── books.js
    ├── charts.js
    ├── genres.js
    ├── storage.js
    └── ui.js
```

### File Responsibilities

| File | Responsibility |
|---|---|
| `index.html` | Defines the website structure and frontend sections |
| `style.css` | Controls the layout, colors, typography, components, and responsive styling |
| `server.js` | Configures the Express server, JSON storage operations, API endpoints, and error handling |
| `package.json` | Defines the project metadata, dependencies, and start command |
| `package-lock.json` | Records the installed dependency versions |
| `data/books.json` | Stores book records |
| `js/app.js` | Coordinates form submission, validation, editing, deletion, and interface updates |
| `js/bookService.js` | Sends frontend requests to the REST API |
| `js/books.js` | Handles book-card rendering and related library functionality |
| `js/charts.js` | Creates and updates the genre and reading-status charts |
| `js/genres.js` | Defines the main genres and subgenres |
| `js/storage.js` | Contains the existing storage utility |
| `js/ui.js` | Supports interface-related functionality |

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Chart.js
- Google Fonts

### Backend
- Node.js
- Express.js
- REST API
- JSON file storage

### Development Tools
- Visual Studio Code
- Git
- GitHub
- npm

---

## 🚀 How to Run the Application

### Requirements

- Node.js and npm installed
- A modern web browser
- Git, if cloning the repository

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

### 4. Start the Backend Server

```bash
npm start
```

The server should start at:

```text
http://localhost:3000
```

### 5. Open the Application

Open the following address in your browser:

**http://localhost:3000**

To check the API directly, visit:

**http://localhost:3000/api/books**

The API should return a JSON array containing the saved book records, or `[]` when the collection is empty.

**Important:** Run the application through the Express server. Live Server alone does not run the backend API.

---

## 🧪 Testing Checklist

The following checks can be used to verify the application.

### Frontend
- [ ] Website loads with the existing design.
- [ ] Main genre selection displays the appropriate subgenres.
- [ ] Dashboard counts update correctly.
- [ ] Genre and reading-status charts display correctly.
- [ ] Book forms and notifications work as expected.

### Backend API
- [ ] `GET /api/books` retrieves book records.
- [ ] `POST /api/books` creates a book record.
- [ ] `PUT /api/books/:id` updates an existing record.
- [ ] `DELETE /api/books/:id` removes a record.
- [ ] Invalid requests return appropriate error responses.
- [ ] Requests for nonexistent book IDs return `404`.

### Data Persistence and Integration
- [ ] Added books appear in the reading library.
- [ ] Updated books display the latest information.
- [ ] Deleted books no longer appear in the collection.
- [ ] Changes are reflected in `data/books.json`.
- [ ] Saved records remain after restarting the server.
- [ ] The frontend refreshes the library after successful API operations.

---

## 🔍 Milestone Alignment

### Milestone 1 — Interactive Frontend Web Application

MS1 established the Book Tracker interface and its core interactive features.

| Area | Implementation |
|---|---|
| Webpage structure | HTML-based dashboard, forms, charts, and reading library |
| Visual presentation | CSS styling, layouts, cards, and responsive components |
| Interactivity | JavaScript form handling, validation, and dynamic updates |
| Book management | Create, read, update, and delete functionality |
| Reading insights | Dashboard statistics and charts |
| User feedback | Notifications, confirmation dialogs, and empty states |

### Milestone 2 — Backend Development

MS2 extends the existing application with server-side processing and persistent JSON-file storage.

| Area | Implementation |
|---|---|
| Server setup | Node.js and Express.js |
| API communication | REST endpoints for book management |
| Data persistence | `data/books.json` |
| CRUD operations | API-based creation, retrieval, updating, and deletion |
| Validation | Required-field checks and error responses |
| Frontend integration | Existing JavaScript service connected to the backend |
| Persistence testing | Verification that records remain after a server restart |

---

## 📌 Project Scope

### Included in the Current Implementation

- Interactive book tracking
- Reading dashboard and charts
- Dynamic genre and subgenre selection
- Book creation, retrieval, updating, and deletion
- Reading status, dates, ratings, and reflections
- Form validation and user feedback
- Express.js backend
- REST API integration
- JSON-file storage
- Data persistence across server restarts

### Outside the Current Scope

- User authentication and account management
- Remote database integration
- Cloud synchronization
- Multi-user access
- Online book database integration

These are potential future improvements rather than features of the current implementation.

---

## 🔮 Future Improvements

Possible enhancements include:

- Book search, filtering, and sorting
- Book cover images
- Reading goals and additional reading statistics
- Data export
- Authentication and user accounts
- Remote database and cloud synchronization

---

## 📜 Academic Project

**Course:** MO-IT161 – Web Systems and Technology  
**Program:** Bachelor of Science in Information Technology  
**Group:** Group 31  
**Academic Year:** 2026–2027  
**Milestone 1:** Interactive Frontend Web Application  
**Milestone 2:** Backend Development and Frontend Integration  

---

> **Book Tracker — Organize your reading journey, one book at a time.**
