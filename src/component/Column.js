import React from "react";
import { color } from "./myHooks";

const Column = ({ num }) => {
  return (
    <div
      style={{
        background: color(num),
        color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
      }}
      className="column"
    >
      {num !== 0 ? num : ""}
    </div>
  );
};

export default Column;
