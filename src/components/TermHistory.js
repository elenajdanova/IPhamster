import React from 'react';

const TermHistory = (props) => {

props.writeHistory();

return (
  <div id="history">
    <div>{props.currOutput}</div>
    <span className="prompt-color"></span>
    <span></span>
  </div>
)
};

export default TermHistory;
