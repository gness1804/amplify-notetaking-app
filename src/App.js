import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';

class App extends Component {
  render() {
    return <div>I should only be seen if the user is signed in.</div>;
  }
}

export default withAuthenticator(App, {
  includeGreetings: true,
});
