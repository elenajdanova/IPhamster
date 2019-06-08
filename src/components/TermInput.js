import React from 'react';

class TermInput extends React.Component {
  constructor(props) {
    super(props);
    this.cmdline = React.createRef();
    this.state = {cmdline: ''};
  }

  componentDidMount(){
    this.cmdline.disabled = true;
  }

  onFormSubmit = event => {
    event.preventDefault();
    this.props.afterUserSubmit(this.state.cmdline.toLowerCase());
    this.setState({cmdline: ''});
    // TODO: validate input length up to 255 symbols
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}
      id="input-line" className="input-line inLine">
          <input type="text" id="cmdline" className="inLine"
              ref={cmdline => { this.cmdline = cmdline; }}
              value = {this.state.cmdline}
              onChange={ e => this.setState({cmdline: e.target.value}) }
              autoComplete="off"
              autoCorrect="off" autoCapitalize="off"
              spellCheck="false" autoFocus
          />
      </form>
    );
  }
}

export default TermInput;
