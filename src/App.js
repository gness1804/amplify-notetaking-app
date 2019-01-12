import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: 1,
          details: 'I am a new note.',
        },
      ],
    };
  }

  render() {
    const { notes } = this.state;

    return (
      <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-1">Notetaker</h1>
        {/* Note form here */}
        <form className="mb3">
          <input
            type="text"
            className="pa2 f4"
            placeholder="Write your note."
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
