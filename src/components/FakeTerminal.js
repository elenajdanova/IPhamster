import React from 'react';

class FakeTerminal extends React.Component {
  constructor(props) {
   super(props);
   this.output = React.createRef();
   this.cmdline = React.createRef();
   this.prompt = React.createRef();
   this.state = {text: ''};
}

  render(){
          return (
              <div className="column" id="terminal">
                  <div id="output" ref={this.output}>{this.state.text}</div>
                  <div id="input-line" className="input-line">
                      <div id="prompt" className="prompt-color"
                           ref={this.prompt}>
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
