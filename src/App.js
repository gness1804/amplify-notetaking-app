import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import NotesList from './components/NotesList';
import { createNote, deleteNote, updateNote } from './graphql/mutations';
import { listNotes } from './graphql/queries';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      details: '',
      notes: [],
    };
  }

  async componentDidMount() {
    const initResult = await API.graphql(graphqlOperation(listNotes));
    const notes = initResult.data.listNotes.items;
    this.setState({
      notes,
    });
  }

  hasExistingNote = () => {
    const { notes, id } = this.state;
    if (id) {
      return notes.filter(n => n.id === id).length > 0;
    }
    return false;
  };

  handleSetNote = ({ id, details }) => {
    this.setState({
      id,
      details,
    });
  };

  handleDeleteNote = async id => {
    const { notes } = this.state;
    const input = {
      id,
    };
    const result = await API.graphql(
      graphqlOperation(deleteNote, {
        input,
      }),
    );
    const { id: deletedNoteId } = result.data.deleteNote;
    const newNotes = await notes.filter(n => n.id !== deletedNoteId);
    this.setState({
      notes: newNotes,
    });
  };

  handleChangeNote = e => {
    this.setState({
      details: e.target.value,
    });
  };

  handleAddNote = async e => {
    const { notes, details, id } = this.state;
    e.preventDefault();
    // check if we have an existing note. If so, update it.
    if (this.hasExistingNote()) {
      // we have an existing note. Update it in the db.
      await this.updateNote(id, details, notes);
    } else {
      // create a new note.
      await this.createNoteFromScratch(details, notes);
    }
  };

  async updateNote(id, details, notes) {
    const input = {
      id,
      details,
    };
    const result = await API.graphql(
      graphqlOperation(updateNote, {
        input,
      }),
    );

    const { id: targetNoteId } = result.data.updateNote;
    const targetIndex = notes.findIndex(n => n.id === targetNoteId);

    const newNotes = [
      ...notes.slice(0, targetIndex),
      result.data.updateNote,
      ...notes.slice(targetIndex + 1),
    ];

    this.setState({
      notes: newNotes,
      details: '',
      id: '',
    });
  }

  async createNoteFromScratch(details, notes) {
    const input = {
      details,
    };
    const result = await API.graphql(graphqlOperation(createNote, { input }));
    const newNote = result.data.createNote;
    this.setState({
      notes: [newNote, ...notes],
      details: '',
    });
  }

  render() {
    const { notes, details } = this.state;

    return (
      <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-1">Notetaker</h1>
        <form onSubmit={this.handleAddNote} className="mb3">
          <input
            type="text"
            className="pa2 f4"
            placeholder="Write your note."
            onChange={this.handleChangeNote}
            value={details}
          />
          <button className="pa2 f4" type="submit">
            Add Note
          </button>
        </form>
        <NotesList
          notes={notes}
          handleDeleteNote={this.handleDeleteNote}
          handleSetNote={this.handleSetNote}
        />
      </div>
    );
  }
}

export default withAuthenticator(App, {
  includeGreetings: true,
});
