import styles from './css/fakeTerminal.css';
import React from 'react';
import TermOutput from './TermOutput';
import TermInput from './TermInput';
import Prompt from './Prompt';

const defaultOpts = {
  welcome: "Welcome to IP Terminal! Type 'start' and let's go!",
  host: "IP.com",
  user: "hamster",
  is_root: false,
  speed: 45
};

class FakeTerminal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { question: true, result: '', prompt:'', command: '', id: 0 };
  }

  onFormSubmit = (command) => {
    // decide what to do in engines
    let output = 'Nice job!';
    this.setState({result: output, command: command});
    this.setState((state) => {
      return {id: state.id + 1}
    });
  }

  makeUserReady = () => {
    this.setState({prompt: defaultOpts.user + "@" + defaultOpts.host + ":~" + (defaultOpts.root ? "#" : "$") });
    this.childCmdline.cmdline.disabled = false;
    this.childCmdline.cmdline.focus();
  }

   render(){
        return (
          <div className="column" id="terminal">
              <TermOutput result = {this.state.result}
                          id = {this.state.id}
                          onTyperEnd = {this.makeUserReady}
              />
              <Prompt prompt = {this.state.prompt}/>
              <TermInput afterUserSubmit={this.onFormSubmit}
                         ref = {(node) => this.childCmdline = node}
              />
          </div>
      );
    }
}

export default FakeTerminal;
