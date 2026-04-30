# NoteFlow - Premium MERN Notes App

A full-stack note management application built with the MERN stack (MongoDB, Express, React, Node.js) featuring JWT authentication, soft deletion, and a premium dark mode UI.

## 🚀 Features

- **Authentication**: Secure registration and login with JWT and bcrypt.
- **Note Management**: Create, Read, Update, and Soft Delete notes.
- **Pinning**: Keep important notes at the top.
- **Tagging**: Categorize notes for easy searching.
- **Search**: Real-time search by title, content, or tags.
- **Premium UI**: Modern dark mode with glassmorphism and smooth animations.
- **Responsive**: Fully functional on mobile and desktop.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide Icons, Axios.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Express Validator.

## 📦 Installation & Setup

### 1. Prerequisites
- Node.js installed
- MongoDB instance (Local or Atlas)

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## 📖 API Documentation

### Auth Routes
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Sign in

### Notes Routes (Protected)
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note (or toggle pin)
- `DELETE /api/notes/:id` - Soft delete a note

## 📝 License
This project is licensed under the ISC License.
