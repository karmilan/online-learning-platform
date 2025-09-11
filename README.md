# Online Learning Platform

A web-based platform for online courses and student management.

## Features

- User authentication
- Course management and enrollment
- Student management

## Technologies

### 🔹 Backend

- **Node.js + Express.js** → Fast, lightweight, and widely used for building REST APIs.
- **MongoDB + Mongoose** → NoSQL database with schema flexibility; Mongoose ensures structured models and relationships.
- **JWT Authentication** → Secure user login and role-based access (student, admin).
- **bcrypt** → For password hashing and security.
- **dotenv** → Manages environment variables securely.

---

### 🔹 Frontend

- **React (with Vite)** → Blazing fast development experience with React’s component-based architecture and Vite’s optimized bundling.
- **React Router v6** → Handles multi-role navigation (students vs. admins).
- **Tailwind CSS** → Utility-first CSS for clean, responsive, and consistent UI styling.
- **Context API (AuthContext)** → Manages authentication state across the app.

---

### 🔹 Tooling & Standards

- **Prettier** → Code consistency and maintainability.
- **Git + GitHub** → Version control with clear commit practices.
- **RESTful API Design** → Versioned routes (`/api/v1/users`, `/api/v1/courses`).

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/karmilan/online-learning-platform.git
   ```
2. Install dependencies:
   ```bash
   cd backend / frontend
   npm install
   ```
3. Start the development server:
   ```bash
   cd backend / frontend
   npm run dev
   ```
