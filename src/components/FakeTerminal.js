import styles from './css/fakeTerminal.css';
import React from 'react';

let defaultOpts = {
  welcome: "Welcome to IP Terminal! Type 'start' and let's go!",
  host: "IP.com",
  user: "hamster",
  is_root: false,
  speed: 65
};

let i = 0;
let output = '';

class FakeTerminal extends React.Component {
    constructor(props) {
       super(props);
       this.output = React.createRef();
       this.cmdline = React.createRef();
       this.prompt = React.createRef();
       this.state = { output: '',
                      prompt: '',
                      cmdline: ''
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
          let isNewLine = char === "\n";
          output += isNewLine ? "\n" : char;
          this.setState({output: output});
          console.log(isNewLine);
          i++;
      } else {
         clearInterval(this.timerID);
         this.setState({output: output += "\n"});
         i = 0;
         this.userReady();
     }
   }

   userReady = () => {
      this.cmdline.focus();
      this.setState({ prompt: defaultOpts.user + "@" + defaultOpts.host + ":~" + (defaultOpts.root ? "#" : "$") });
      // this.output.scrollIntoView({ behavior: 'smooth' });
    };

    onFormSubmit = event => {
    event.preventDefault();
    this.handleTyping("Nice!");
    this.setState({cmdline: ''})
  };

   render(){
        return (
          <div className="column" id="terminal">
              <div ref={output => {this.output = output}} id="output">{this.state.output}</div>
              <form onSubmit={this.onFormSubmit} id="input-line" className="input-line">
                  <div id="prompt" className="prompt-color"
                       ref={this.prompt}> {this.state.prompt}
                  </div>&nbsp;
                  <div>
                      <input type="text" id="cmdline" ref={cmdline=>{this.cmdline = cmdline}}
                      value = {this.state.cmdline}
                      onChange={ e => this.setState({cmdline: e.target.value}) }
                      autoComplete="off"
                      autoCorrect="off" autoCapitalize="off"
                      spellCheck="false" autoFocus/>
                  </div>
              </form>
          </div>
      );
    }
}

  export default FakeTerminal;
