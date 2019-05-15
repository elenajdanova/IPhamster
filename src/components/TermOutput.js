import React from 'react';
//import TermHistory from './TermHistory';

  const defaultOpts = {
    welcome: "Welcome to IP Terminal! Type 'start' and let's go!",
    speed: 45
  };
  let i = 0;

  class TermOutput extends React.Component {
    constructor(props) {
      super(props);
      this.state = { output: ''};
    }

    componentDidMount(){
      this.handleTyping(defaultOpts.welcome);
    }

    componentDidUpdate(prevProps){
      if ( prevProps.id !== this.props.id ) {
        this.handleTyping(this.props.result);
      }
    }

    handleTyping(text){
      this.timerID = setInterval(
        () => this.typer(text), defaultOpts.speed
      );
    }

    typer(text) {
      if ( i < text.length ) {
        let char = text.charAt(i);

        this.setState((state) => {
          return {output: state.output + char}
        });

        i++;
      } else {
        clearInterval(this.timerID);
        this.setState((state) => {
          return {output: state.output + "\n"}
        });
        i = 0;
        this.props.onTyperEnd();
      }
    }

    render() {
      return (
        <div id="output"> {this.state.output} </div>
      );
    }
  }

// <TermHistory
//   currOutput = {this.state.output}
//   writeHistory = {this.clearOutput}
// />

export default TermOutput;
