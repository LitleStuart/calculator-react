import React, { useState } from "react";
import Keyboard from "./Keyboard";
import Screen from "./Screen";

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

function screenHasDot(screen) {
  return screen.indexOf(".") !== -1;
}

function screenHasOperator(screen) {
  const hasPlus = screen.indexOf("+") !== -1;
  const hasMinus = screen.indexOf("-") !== -1;
  const hasMulti = screen.indexOf("*") !== -1;
  const hasDevide = screen.indexOf("/") !== -1;

  return hasPlus || hasMinus || hasMulti || hasDevide;
}

function serializeString(screen, operator) {
  const result = screen.split(operator);
  return {
    first: Number.parseFloat(result[0]),
    second: Number.parseFloat(result[1]),
  };
}

function calculateResult(first, second, operator) {
  switch (operator) {
    case "+":
      return Number((first + second).toFixed(7));
    case "-":
      return Number((first - second).toFixed(7));
    case "*":
      return Number((first * second).toFixed(7));
    case "/":
      return Number((first / second).toFixed(7));

    default:
      return;
  }
}

const Calculator = () => {
  const [state, setState] = useState({ screen: "", operator: null });

  function handleDotButton() {
    console.log(state);
    let numberToCheck = state.screen;
    if (state.operator) {
      numberToCheck = state.screen.split(state.operator)[1];
    }
    if (screenHasDot(numberToCheck) || !numberToCheck.length) return;
    setState({ screen: state.screen + ".", operator: state.operator });
  }

  function handleBackspaceButton() {
    let operator = state.operator;
    const lastChar = state.screen[state.screen.length - 1];
    if (isOperator(lastChar)) {
      operator = null;
    }
    setState({
      screen: state.screen.substring(0, state.screen.length - 1),
      operator: operator,
    });
  }

  function handleOperatorButton(operator) {
    if (!state.screen.length) return;
    if (state.operator === null) {
      setState({ screen: state.screen + operator, operator: operator });
      return;
    }
    const lastChar = state.screen[state.screen.length - 1];
    if (isOperator(lastChar)) {
      setState({
        screen: state.screen.substring(0, state.screen.length - 1) + operator,
        operator: operator,
      });
      return;
    }
    handleEqualButton();
    handleOperatorButton(operator);
  }

  function handleEqualButton() {
    const lastChar = state.screen[state.screen.length - 1];
    if (!state.screen.length || !state.operator || isOperator(lastChar)) return;
    const { first, second } = serializeString(state.screen, state.operator);
    setState({
      screen: calculateResult(first, second, state.operator).toString(),
      operator: null,
    });
  }

  function handleButton(buttonValue) {
    if (isDigit(buttonValue)) {
      setState({
        screen: state.screen + buttonValue,
        operator: state.operator,
      });
    } else if (isDot(buttonValue)) {
      handleDotButton();
    } else if (isOperator(buttonValue)) {
      handleOperatorButton(buttonValue);
    } else if (isBackspace(buttonValue)) {
      handleBackspaceButton();
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
