import React from 'react';

const Prompt = (props) => {
  return (
    <span id="prompt" className="prompt-color inLine">
        {props.prompt}
    </span>
  )
};

export default Prompt;
