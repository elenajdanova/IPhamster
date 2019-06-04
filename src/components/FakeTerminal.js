import styles from './css/fakeTerminal.css';
import React from 'react';
import TermOutput from './TermOutput';
import TermInput from './TermInput';
import Prompt from './Prompt';
import TerminalEngine from '../services/terminalEngine';

const defaultOpts = {
  host: "IP.com",
  user: "hamster",
  is_root: false
};

class FakeTerminal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        result: '',
        prompt:'',
        command: '',
        id: 0
        //gameON: false
    };
  }

  onFormSubmit = (command) => {
    //this.gameMode(command);
    let brain = new TerminalEngine(command);
    let output = brain.getOutput();
    //this.setState({gameON: brain.isGameON()})
    this.setState({result: output, command: command});
    this.setState((state) => { return { id: state.id + 1 } });
    this.childCmdline.cmdline.disabled = true;
  }

  makeUserReady = () => {
    this.setState({prompt: defaultOpts.user + "@" + defaultOpts.host + ":~" + (defaultOpts.root ? "#" : "$") });
    this.childCmdline.cmdline.disabled = false;
    this.childCmdline.cmdline.focus();
  }

  // gameMode = async (cmd) => {
  //   if (!this.state.gameON) {
  //       let gameStarted = cmd === 'ipv4' || cmd === 'ipv6' || cmd === 'both';
  //       if (gameStarted) {
  //           await this.setState({ gameON: true }, () => {console.log(this.state.gameON);});
  //       }
  //   }
  // }

   render(){
        return (
          <div className="column" id="terminal">
              <TermOutput
                  result = {this.state.result}
                  id = {this.state.id}
                  onTyperEnd = {this.makeUserReady}
                  curPrompt = {this.state.prompt}
                  curCommand = {this.state.command}
              />
              <Prompt prompt = {this.state.prompt}/>
              <TermInput
                  afterUserSubmit={this.onFormSubmit}
                  ref = {(node) => this.childCmdline = node}
              />
          </div>
      );
    }
}

export default FakeTerminal;
