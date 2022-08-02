import React from "react";
import { isBackspace, isOperator } from "../utils/helpers/Calculator.helpers";

const Button = (props) => {
  return (
    <div
      onClick={() => {
        props.onButtonClick(props.value);
      }}
      className={"button"}
    >
      <span
        className={
          (isOperator(props.value) || isBackspace(props.value)) &&
          props.value !== "/"
            ? "material-symbols-outlined"
            : ""
        }
      >
        {props.value}
      </span>
    </div>
  );
};

export default Button;
