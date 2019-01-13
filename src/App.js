import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import NotesList from './components/NotesList';
import { createNote, deleteNote } from './graphql/mutations';
import { listNotes } from './graphql/queries';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteDetails: '',
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
      noteDetails: e.target.value,
    });
  };

  handleAddNote = async e => {
    const { notes, noteDetails } = this.state;
    e.preventDefault();
    const input = {
      details: noteDetails,
    };
    const result = await API.graphql(graphqlOperation(createNote, { input }));
    const newNote = result.data.createNote;
    this.setState({
      notes: [newNote, ...notes],
      noteDetails: '',
    });
  };

  render() {
    const { notes, noteDetails } = this.state;

    return (
      <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-1">Notetaker</h1>
        <form onSubmit={this.handleAddNote} className="mb3">
          <input
            type="text"
            className="pa2 f4"
            placeholder="Write your note."
            onChange={this.handleChangeNote}
            value={noteDetails}
          />
          <button className="pa2 f4" type="submit">
            Add Note
          </button>
        </form>
        <NotesList notes={notes} handleDeleteNote={this.handleDeleteNote} />
      </div>
    );
  }
}

export default withAuthenticator(App, {
  includeGreetings: true,
});
