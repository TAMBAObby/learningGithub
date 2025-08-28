const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// In-memory storage for notes
let notes = [
  {
    id: 1,
    title: "Welcome to Notes App",
    content: "This is your first note! You can add, view, and delete notes.",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Sample Note",
    content: "This is a sample note to demonstrate the app functionality.",
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

// Routes

// Get all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Get a single note by ID
app.get('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(n => n.id === id);
  
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  res.json(note);
});

// Create a new note
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  const newNote = {
    id: nextId++,
    title,
    content,
    createdAt: new Date().toISOString()
  };
  
  notes.push(newNote);
  res.status(201).json(newNote);
});

// Update a note
app.put('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  
  const noteIndex = notes.findIndex(n => n.id === id);
  
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  notes[noteIndex] = {
    ...notes[noteIndex],
    title,
    content,
    updatedAt: new Date().toISOString()
  };
  
  res.json(notes[noteIndex]);
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const noteIndex = notes.findIndex(n => n.id === id);
  
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  const deletedNote = notes.splice(noteIndex, 1)[0];
  res.json({ message: 'Note deleted successfully', note: deletedNote });
});

// Serve React app for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});