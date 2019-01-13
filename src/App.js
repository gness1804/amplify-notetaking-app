import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { createNote } from './graphql/mutations';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteDetails: '',
      notes: [],
    };
  }

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
        {notes.map(n => (
          <div key={n.id} className="flex items-center">
            <li className="list pa1 f3">{n.details}</li>
            <button className="bg-transparent bn f4">
              <span>&times;</span>
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default withAuthenticator(App, {
  includeGreetings: true,
});
