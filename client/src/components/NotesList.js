import React from 'react';
import NoteCard from './NoteCard';

const NotesList = ({ notes, onDeleteNote }) => {
  if (notes.length === 0) {
    return (
      <div className="notes-list-container">
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3>No notes yet</h3>
          <p>Create your first note by clicking the form above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-list-container">
      <div className="notes-grid">
        {notes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDeleteNote}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesList;