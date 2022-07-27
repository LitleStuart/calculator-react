import React from "react";
import { isBackspace, isOperator } from "../utils/helpers/Calculator.helpers";

const Button = (props) => {
  return (
    <button
      onClick={() => {
        props.onButtonClick(props.value);
      }}
      className={
        (isOperator(props.value) || isBackspace(props.value)) &&
        props.value !== "/"
          ? "material-symbols-outlined"
          : ""
      }
    >
      <span>{props.value}</span>
    </button>
  );
};

export default Button;
