import React, { useEffect, useState } from 'https://esm.sh/react@18';
import { createRoot } from 'https://esm.sh/react-dom@18/client';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadNotes() {
    try {
      setLoading(true);
      const res = await fetch('/api/notes');
      const data = await res.json();
      setNotes(data);
    } catch (e) {
      setError('Failed to load notes');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadNotes(); }, []);

  async function addNote(e) {
    e.preventDefault();
    setError('');
    if (!title.trim() || !content.trim()) {
      setError('Please provide both title and content');
      return;
    }
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), content: content.trim() })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add note');
      }
      const newNote = await res.json();
      setNotes(prev => [newNote, ...prev]);
      setTitle('');
      setContent('');
    } catch (e) {
      setError(e.message);
    }
  }

  async function deleteNote(id) {
    setError('');
    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete note');
      }
      setNotes(prev => prev.filter(n => n.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="title">Notes</div>
        <div className="muted">Simple notes app (in-memory)</div>
      </div>

      <div className="panel">
        <form className="form" onSubmit={addNote}>
          <input className="input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <input className="input" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
          <button className="button" type="submit">Add</button>
        </form>
        {error && <div className="muted" style={{ color: '#fca5a5' }}>{error}</div>}
      </div>

      {loading ? (
        <div className="empty">Loading...</div>
      ) : notes.length === 0 ? (
        <div className="empty">No notes yet. Add your first note above.</div>
      ) : (
        <div className="note-list">
          {notes.map(note => (
            <div key={note.id} className="note">
              <div className="note-title">{note.title}</div>
              <div className="note-content">{note.content}</div>
              <div className="note-actions">
                <button className="delete" onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

