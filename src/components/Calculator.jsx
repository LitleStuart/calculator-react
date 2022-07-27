import React, { useState } from "react";
import {
  screenHasDot,
  isOperator,
  serializeString,
  calculateResult,
  isDigit,
  isDot,
  isBackspace,
  isEqualButton,
} from "../utils/helpers/Calculator.helpers";
import Keyboard from "./Keyboard";
import Screen from "./Screen";

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
    <div className="calculator">
      <Screen value={state.screen} />
      <Keyboard onButtonClick={handleButton} />
    </div>
  );
};

export default Calculator;
