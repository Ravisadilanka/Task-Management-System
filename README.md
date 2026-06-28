# Task Management System

A full-stack Task Management System built with the MERN stack that allows users to create, manage, assign, update, and track tasks with role-based access control.

---

## Features

### Authentication

- JWT Authentication
- Access Token & Refresh Token
- Secure HTTP-only Cookies
- User Login & Registration
- Logout

### User Roles

#### Admin

- View all tasks
- Create tasks
- Assign tasks to any user
- Update any task
- Delete any task
- View all users

#### Regular User

- View tasks they created
- View tasks assigned to them
- Create tasks
- Update tasks they created
- Delete tasks they created

---

## Task Management

- Create Task
- View Tasks
- Task Details
- Update Task
- Delete Task
- Search Tasks
- Filter by Status
- Filter by Priority
- Sort Tasks

---

## Dashboard

- Total Tasks
- Open Tasks
- In Progress Tasks
- Testing Tasks
- Completed Tasks
- Recent Tasks Overview

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- React Hook Form
- Zod
- Axios
- Shadcn UI
- Lucide React
- Sonner

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cookie Parser


---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/Ravisadilanka/Task-Management-System.git

cd Task-Management-System
```

---

# Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the **backend** folder.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_REFRESH_SECRET=your_refresh_secret

CLIENT_URL=http://localhost:5173
```

Run backend

```bash
npm run dev
```

---

# Frontend Setup

Open another terminal.

```bash
cd frontend

npm install
```

Create a `.env` file inside the **frontend** folder.

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend

```bash
npm run dev
```

---

## API Endpoints

### Authentication

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/users/me
```

### Users

```
GET    /api/users
GET    /api/users/me
```

### Tasks

```
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

## Responsive Design

The application is fully responsive and optimized for:

- Desktop
- Tablet
- Mobile

---

## Security

- JWT Authentication
- HTTP-only Refresh Token Cookies
- Password Hashing using bcrypt
- Protected Routes
- Role-based Authorization

---

## Assumptions

- Authentication is required to access the application.
- Only administrators can assign tasks to other users.
- Regular users are automatically assigned to the tasks they create.
- Only administrators and task creators can edit or delete tasks.
- Regular users can only view tasks they created or tasks assigned to them.

---

## Author

**Ravisa Dilanka**

GitHub: https://github.com/Ravisadilanka