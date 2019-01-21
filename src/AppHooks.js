import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import NotesList from './components/NotesList';
import { createNote, deleteNote, updateNote } from './graphql/mutations';
import { listNotes } from './graphql/queries';
import {
  onCreateNote,
  onDeleteNote,
  onUpdateNote,
} from './graphql/subscriptions';

const App = () => {
  const [id, setId] = useState('');
  const [details, setDetails] = useState('');
  const [notes, setNotes] = useState([]);

  let onCreateNoteListener;
  let onDeleteNoteListener;
  let onUpdateNoteListener;

  const subscribeToUpdateNote = () => {
    onUpdateNoteListener = API.graphql(
      graphqlOperation(onUpdateNote),
    ).subscribe({
      next: noteData => {
        const { id: targetNoteId } = noteData.value.data.onUpdateNote;
        const targetIndex = notes.findIndex(n => n.id === targetNoteId);

        const newNotes = [
          ...notes.slice(0, targetIndex),
          noteData.value.data.onUpdateNote,
          ...notes.slice(targetIndex + 1),
        ];

        setNotes(newNotes);
        setDetails('');
        setId('');
      },
    });
  };

  const subscribeToDeleteNote = () => {
    onDeleteNoteListener = API.graphql(
      graphqlOperation(onDeleteNote),
    ).subscribe({
      next: noteData => {
        const { id: deletedNoteId } = noteData.value.data.onDeleteNote;
        const newNotes = notes.filter(n => n.id !== deletedNoteId);
        setNotes(newNotes);
      },
    });
  };

  const subscribeToCreateNote = () => {
    onCreateNoteListener = API.graphql(
      graphqlOperation(onCreateNote),
    ).subscribe({
      next: noteData => {
        const newNote = noteData.value.data.onCreateNote;
        const prevNotes = notes.filter(n => n.id !== newNote.id);
        setNotes([...prevNotes, newNote]);
      },
    });
  };

  const getAllNotes = async () => {
    const initResult = await API.graphql(graphqlOperation(listNotes));
    setNotes(initResult.data.listNotes.items);
  };

  useEffect(async () => {
    await getAllNotes();
    subscribeToCreateNote();
    subscribeToDeleteNote();
    subscribeToUpdateNote();

    return () => {
      onCreateNoteListener.unsubscribe();
      onDeleteNoteListener.unsubscribe();
      onUpdateNoteListener.unsubscribe();
    };
  }, []);

  const hasExistingNote = () => {
    if (id) {
      return notes.filter(n => n.id === id).length > 0;
    }
    return false;
  };

  const handleSetNote = ({ noteId, noteDetails }) => {
    setId(noteId);
    setDetails(noteDetails);
  };

  const handleDeleteNote = async noteId => {
    const input = {
      id: noteId,
    };
    await API.graphql(
      graphqlOperation(deleteNote, {
        input,
      }),
    );
  };

  const handleChangeNote = e => {
    setDetails(e.target.value);
  };

  const updateNoteFunc = async (noteId, noteDetails) => {
    const input = {
      id: noteId,
      details: noteDetails,
    };
    await API.graphql(
      graphqlOperation(updateNote, {
        input,
      }),
    );
  };

  const createNoteFromScratch = async noteDetails => {
    const input = {
      details: noteDetails,
    };
    await API.graphql(graphqlOperation(createNote, { input }));
    setDetails('');
  };

  const handleAddNote = async e => {
    e.preventDefault();
    if (!details) {
      alert('Oops! Your note must include text.');
      return;
    }
    // check if we have an existing note. If so, update it.
    if (hasExistingNote()) {
      // we have an existing note. Update it in the db.
      await updateNoteFunc(id, details);
    } else {
      // create a new note.
      await createNoteFromScratch(details);
    }
  };

  return (
    <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
      <h1 className="code f2-1">Notetaker</h1>
      <form onSubmit={handleAddNote} className="mb3">
        <input
          type="text"
          className="pa2 f4"
          placeholder="Write your note."
          onChange={handleChangeNote}
          value={details}
        />
        <button className="pa2 f4" type="submit">
          {hasExistingNote() ? <span>Update Note</span> : <span>Add Note</span>}
        </button>
      </form>
      <NotesList
        notes={notes}
        handleDeleteNote={handleDeleteNote}
        handleSetNote={handleSetNote}
      />
    </div>
  );
};

export default withAuthenticator(App, {
  includeGreetings: true,
});
