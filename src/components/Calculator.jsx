import React, { useState } from "react";
import Keyboard from "./Keyboard";
import Screen from "./Screen";

const Calculator = () => {
  const [state, setState] = useState({ screen: "", operator: null });

  function calculateResult() {}

  function serializeScreen() {}

  function isDigit(value) {
    return Number.parseInt(value) >= 0 && Number.parseInt(value) <= 9;
  }

  function isOperator(value) {
    return value === "+" || value === "-" || value === "*" || value === "/";
  }

  function isDot(value) {
    return value === ".";
  }

  function isBackspace(value) {
    return value === "backspace";
  }

  function isEqualButton(value) {
    return value === "=";
  }

  function screenHasDot() {
    return state.screen.indexOf(".") !== -1;
  }

  function screenHasOperator() {
    const hasPlus = state.screen.indexOf("+") !== -1;
    const hasMinus = state.screen.indexOf("-") !== -1;
    const hasMulti = state.screen.indexOf("*") !== -1;
    const hasDevide = state.screen.indexOf("/") !== -1;

    return hasPlus || hasMinus || hasMulti || hasDevide;
  }

  function handleDotButton() {}

  function handleOperatorButton(operator) {}

  function handleEqualButton() {}

  function handleButton(buttonValue) {
    if (isDigit(buttonValue)) {
      setState({ screen: state.screen + buttonValue });
    } else if (isDot(buttonValue)) {
      handleDotButton();
    } else if (isOperator(buttonValue)) {
      handleOperatorButton(buttonValue);
    } else if (isBackspace(buttonValue)) {
      setState({ screen: state.screen.substring(0, state.screen.length - 1) });
    } else if (isEqualButton(buttonValue)) {
      handleEqualButton();
    }
  }

  return (
    <div>
      <Screen value={state.screen} />
      <Keyboard onButtonClick={handleButton} />
    </div>
  );
};

export default Calculator;
