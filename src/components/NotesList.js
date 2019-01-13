import React from 'react';
import PropTypes from 'prop-types';

function NotesList({ notes, handleDeleteNote }) {
  const deleteNote = id => {
    handleDeleteNote(id);
  };

  return (
    <div>
      {notes.map(n => (
        <div key={n.id} className="flex items-center">
          <li className="list pa1 f3">{n.details}</li>
          <button
            className="bg-transparent bn f4"
            onClick={() => {
              deleteNote(n.id);
            }}
          >
            <span>&times;</span>
          </button>
        </div>
      ))}
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
    }).isRequired,
  ),
  handleDeleteNote: PropTypes.func.isRequired,
};

export { NotesList as default };
