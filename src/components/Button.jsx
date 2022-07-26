import React from "react";

const Button = (props) => {
  return (
    <button
      onClick={() => {
        props.onButtonClick(props.value);
      }}
    >
      <span>{props.value}</span>
    </button>
  );
};

export default Button;
