import styles from './css/app.css';
import React from 'react';
import Task from './Task';
import FakeTerminal from './FakeTerminal';

class App extends React.Component {

  render() {
    return (
      <div className="ui segment">
          <div className="ui vertically divided grid">
              <div className="two column row">
                  <Task />
                  <FakeTerminal />
              </div>
          </div>
      </div>
    );
  }
}

export default App;
