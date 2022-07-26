import React from "react";

const Screen = (props) => {
  return (
    <input
      readOnly
      type="text"
      value={props.value}
      style={{ textAlign: "right" }}
    ></input>
  );
};

export default Screen;
