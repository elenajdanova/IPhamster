import styles from './css/fakeTerminal.css';
import React from 'react';

let defaultOpts = {
  welcome: "Welcome!",
  host: "IP.com",
  user: "hamster",
  is_root: false,
  speed: 75
};

let i = 0;
let output = '';

class FakeTerminal extends React.Component {
    constructor(props) {
       super(props);
       this.output = React.createRef();
       this.cmdline = React.createRef();
       this.prompt = React.createRef();
       this.state = { text: '',
                      prompt: ''
                    };
   }

   componentDidMount(){
      this.handleTyping(defaultOpts.welcome);
   }

   handleTyping(text){
      this.timerID = setInterval(
          () => this.typer(text), defaultOpts.speed
      );
   }

   typer(text) {
      if ( i < text.length ) {
          let char = text.charAt(i);
          output += char;
          this.setState({text: output});
          i++;
      } else {
         clearInterval(this.timerID);
         this.unlock();
     }
   }

   unlock = () => {
         this.setState({ prompt: defaultOpts.user + "@" + defaultOpts.host + ":~" + (defaultOpts.root ? "#" : "$") })
        //this.scrollToBottom();
    };

   render(){
        return (
          <div className="column" id="terminal">
              <div id="output" ref={this.output}>{this.state.text}</div>
              <div id="input-line" className="input-line">
                  <div id="prompt" className="prompt-color"
                       ref={this.prompt}> {this.state.prompt}
                  </div>&nbsp;
                  <div>
                      <input type="text" id="cmdline" ref={this.cmdline}
                      autoComplete="off"
                      autoCorrect="off" autoCapitalize="off"
                      spellCheck="false" autoFocus/>
                  </div>
              </div>
          </div>
      );
    }
}

  export default FakeTerminal;
