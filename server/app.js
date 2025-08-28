const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

let notes = [
  { id: 1, title: 'Welcome', content: 'This is your first note.' }
];
let nextId = 2;

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const newNote = { id: nextId++, title, content };
  notes.unshift(newNote);
  res.status(201).json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  const [removed] = notes.splice(idx, 1);
  res.json(removed);
});

// Note: SPA catch-all removed for testing to avoid Express 5 path matching issues

module.exports = app;

