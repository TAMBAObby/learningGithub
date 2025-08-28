# Notes App

A full-stack notes application built with React frontend and Node.js backend. This app allows you to add, view, and delete notes with a clean, modern interface.

## Features

- ✨ Add new notes with title and content
- 📝 View all notes in a responsive grid layout
- 🗑️ Delete notes with confirmation
- 🎨 Modern, clean UI with animations
- 📱 Fully responsive design
- 🚀 In-memory storage (no external database required)

## Tech Stack

- **Frontend**: React, CSS3
- **Backend**: Node.js, Express.js
- **Storage**: In-memory arrays (no database)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation & Running

1. **Install backend dependencies:**
   ```bash
   npm install
   ```

2. **Install frontend dependencies:**
   ```bash
   npm run install-client
   ```

3. **Start the backend server:**
   ```bash
   npm start
   ```
   The server will run on http://localhost:5000

4. **In a new terminal, start the React frontend:**
   ```bash
   npm run client
   ```
   The app will open in your browser at http://localhost:3000

### Development Mode

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a specific note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Project Structure

```
notes-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main App component
│   │   └── App.css        # Styles
├── server.js              # Express backend server
├── package.json           # Backend dependencies
└── README.md
```

## Features Demo

- **Add Notes**: Click in the title field to expand the form and add new notes
- **View Notes**: All notes are displayed in a responsive grid
- **Delete Notes**: Click the trash icon and confirm to delete a note
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices

Enjoy organizing your thoughts! 📝