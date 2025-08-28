import React, { useState } from 'react';

const AddNote = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    setIsSubmitting(true);
    
    const success = await onAddNote({
      title: title.trim(),
      content: content.trim()
    });

    if (success) {
      setTitle('');
      setContent('');
      setIsExpanded(false);
    }
    
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setIsExpanded(false);
  };

  return (
    <div className="add-note-container">
      <form onSubmit={handleSubmit} className="add-note-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="note-title-input"
            disabled={isSubmitting}
          />
        </div>
        
        {isExpanded && (
          <div className="expanded-form">
            <div className="form-group">
              <textarea
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="note-content-input"
                rows="4"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                className="cancel-btn"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="add-btn"
                disabled={isSubmitting || !title.trim() || !content.trim()}
              >
                {isSubmitting ? 'Adding...' : 'Add Note'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddNote;