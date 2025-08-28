import React, { useState, useEffect } from 'react';
import './App.css';
import NotesList from './components/NotesList';
import AddNote from './components/AddNote';
import Header from './components/Header';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' 
  : 'http://localhost:5000';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notes from the server
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/notes`);
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new note
  const addNote = async (noteData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add note');
      }
      
      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      
      setNotes(notes.filter(note => note.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
            <button onClick={fetchNotes} className="retry-btn">
              Retry
            </button>
          </div>
        )}
        
        <AddNote onAddNote={addNote} />
        
        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : (
          <NotesList notes={notes} onDeleteNote={deleteNote} />
        )}
      </main>
    </div>
  );
}

export default App;