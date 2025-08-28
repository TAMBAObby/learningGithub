import React, { useState } from 'react';

const NoteCard = ({ note, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsDeleting(true);
      await onDelete(note.id);
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="note-card">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <button
          onClick={handleDelete}
          className="delete-btn"
          disabled={isDeleting}
          title="Delete note"
        >
          {isDeleting ? '⏳' : '🗑️'}
        </button>
      </div>
      
      <div className="note-content">
        <p>{note.content}</p>
      </div>
      
      <div className="note-footer">
        <span className="note-date">
          Created: {formatDate(note.createdAt)}
        </span>
        {note.updatedAt && (
          <span className="note-date">
            Updated: {formatDate(note.updatedAt)}
          </span>
        )}
      </div>
    </div>
  );
};

export default NoteCard;