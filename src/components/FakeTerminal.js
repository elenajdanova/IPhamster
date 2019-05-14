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
    this.state = { question: true, result: '', prompt:'' };
  }

  onFormSubmit = (command) => {
    // decide what to do in engines
    let output = 'Nice job!'
    this.setState({result: output});
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
