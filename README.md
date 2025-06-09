# Trivia-App TESTER and TYPESCRIPT

## Labb 2: TypeScript och Cypress Testing

### Ursula Vallejo Janne | November 2024

### 📋 Project Summary

This project is a **fullstack Trivia web application** developed as part of the course requirements.
The app allows users to explore trivia questions, create new ones, update them, and delete them — supporting a complete CRUD workflow.

The application consists of:

- **Frontend** built with React and TypeScript (using TSX)
- **Backend** implemented with Node.js, Express, and TypeScript
- **PostgreSQL database** for persistent storage of trivia questions
- **End-to-End (E2E) and component tests** implemented with Cypress and TypeScript

Key features:

- Display a list of trivia questions with answers
- Add new questions through a user-friendly form
- Edit and delete existing questions
- Responsive UI, compatible with both desktop and mobile devices
- Error handling for API calls
- Automated tests covering frontend, backend, and database

Testing:

- Full E2E tests for user interaction and complete flow verification (frontend + backend + database)
- Component tests verifying UI behavior with mock data
- Integration tests verifying direct API behavior
- Use of Cypress Fixtures for mocking API responses
- Test-Driven Development (TDD) applied to selected components
- Behavior-Driven Development (BDD) applied with Given-When-Then approach in specific tests
- UML diagrams created to describe key parts of the project architecture
- Code coverage measured and reported
- Automated test execution with GitHub Actions on each `git push`

The project was built entirely with **TypeScript** — no JavaScript/JSX used.
Special focus was given to test coverage and testing best practices.

This project fulfills both the **functional** and **testing** requirements for the course, with advanced coverage and automation in place.


https://github.com/user-attachments/assets/329a43cf-5d60-4463-980d-a12a4a887777


---

### 🛠️ Technologies Used

- **Frontend**

  - React (with TypeScript and TSX)
  - React Hooks for state management
  - React Bootstrap for responsive UI components
  - CSS Modules for styling

- **Backend**

  - Node.js with Express (written in TypeScript)
  - REST API for CRUD operations

- **Database**

  - PostgreSQL for persistent data storage

- **Testing**
  - Cypress for

---

### General view:

## [<img src="documentation/generalView.png" width="400"/>](main-view)

## [<img src="documentation/allQuestions.png" width="400"/>](allQuestions-view)

## [<img src="documentation/updateQuestion.png" width="400"/>](update-Questions-view)

## [<img src="documentation/nextQuestion.png" width="400"/>](next-Questions-view)

## [<img src="documentation/addQuestion.png" width="400"/>](add-Questions-view)

## [<img src="documentation/addQuestionDetail.png" width="400"/>](add-Questions-view-detail)

---

## Start the Application

### **Frontend** (localhost:5173):

**Terminal 1:**

```bash
$ npm install
$ npm run dev
```

**Terminal 2:**

```bash
$ npx cypress open
```

### **Backend** (localhost:3000):

**Run in watch mode:**

```bash
$ npm install
$ npm run dev
```

### **Database** - PostgreSQL via psql:

**Terminal:**

```bash
$ psql --username=postgres
CREATE DATABASE trivia;
\c trivia;
```

Create Questions and content (db.sql):
**>> Run `backend/db.sql` to create tables.**

---

### 📄 [Detailed Information ## ✅ Testing Overview`](Detail_Info.md)

---
