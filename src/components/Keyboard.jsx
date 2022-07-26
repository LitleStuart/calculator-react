import React from "react";
import Button from "./Button";

const Keyboard = (props) => {
  const keys = "AC () % / 7 8 9 * 4 5 6 - 1 2 3 + 0 . backspace =";
  const keyList = keys.split(" ").map((key) => {
    return <Button onButtonClick={props.onButtonClick} key={key} value={key} />;
  });

  return <div className="keyboard">{keyList}</div>;
};

export default Keyboard;
