import React from 'react';

  const defaultOpts = {
    welcome: "Welcome to IP Terminal! Type 'start' and let's go!",
    speed: 45
  };
  let i = 0;

  class TermOutput extends React.Component {
    constructor(props) {
      super(props);
      this.state = { welcome: '', history: []};
    }

    componentDidMount(){
      this.handleTyping(defaultOpts.welcome, this.welcomeTyper);
    }

    componentDidUpdate(prevProps){
      if ( prevProps.id !== this.props.id ) {
          this.setState((state) => {
              state.history.push({
                  'prompt': this.props.curPrompt,
                  'command': this.props.curCommand,
                  'result': ''
              })
              return {history: state.history}
          })
        this.handleTyping(this.props.result, this.answerTyper);
      }
    }

    handleTyping = (text, callback) => {
      this.timerID = setInterval(
        () => this.typer(text, callback), defaultOpts.speed
      );
    }

    typer(text, callback) {
      if ( i < text.length ) {
        let char = text.charAt(i);
        callback(char);
        i++;
      } else {
        clearInterval(this.timerID);
        i = 0;
        this.props.onTyperEnd();
      }
    }

    welcomeTyper = (char) => {
      this.setState((state) => {
        return {welcome: state.welcome + char}
      });
    }

    answerTyper = (char) => {
      this.setState((state) => {
        if (state.history.length > 0) {
            state.history[state.history.length-1].result += char;
        }
          return {history: state.history}
      });
    }

    render() {
      let historyOut = this.state.history.map((line, index) => {
          return (
            <div key={index}>
              <span className="prompt-color">{line.prompt}&nbsp;</span>
              <span>{line.command}</span>
              <div>{line.result}</div>
            </div>
          )
      });
      return (
        <div id="output">
          {this.state.welcome}
          {historyOut}
        </div>
      );
    }
  }

export default TermOutput;
