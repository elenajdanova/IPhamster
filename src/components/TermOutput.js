import React from 'react';

class TermOutput extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div id="output">
        {this.props.output}
      </div>
    );
  }
}


export default TermOutput;
