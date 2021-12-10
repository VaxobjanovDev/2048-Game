import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import Column from "./Column";
import "./Main.css";
import { useEvent } from "./myHooks";

const Main = () => {
  let ArrowUp = 38;
  let ArrowDown = 40;
  let ArrowLeft = 37;
  let ArrowRight = 39;

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // Initialize
  const initialize = () => {
    let newBox = cloneDeep(data);
    console.log(newBox);

    addItem(newBox);
    console.table(newBox);
    addItem(newBox);
    console.table(newBox);
    setData(newBox);
  };

  // AddNumber

  const addItem = (newBox) => {
    let added = false;
    let boxFull = false;
    let attempts = 0;

    while (!added) {
      if (boxFull) {
        break;
      }

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      attempts++;
      if (newBox[rand1][rand2] === 0) {
        newBox[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
    }
  };

  // Swipe left

  const swipeLeft = () => {
    let oldBox = data;
    let newArray = cloneDeep(data);

    console.log(newArray);
    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;

      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldBox) !== JSON.stringify(newArray)) {
      addItem(newArray);
    }

    setData(newArray);
  };

  const swipeRight = () => {
    let oldData = data;
    let newArray = cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;

      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(newArray)) {
      addItem(newArray);
    }
    setData(newArray);
  };

  const swipeUp = () => {
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));

    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = 1 + slow;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addItem(b);
    }

    setData(b);
  };

  const swipeDown = () => {
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));

    for (let i = 3; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;

      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {
      addItem(b);
    }

    setData(b);
  };

  // Handle key function

  const handleKeyDown = (e) => {
    switch (e.keyCode) {
      case ArrowUp:
        swipeUp();
        break;
      case ArrowDown:
        swipeDown();
        break;
      case ArrowLeft:
        swipeLeft();
        break;
      case ArrowRight:
        swipeRight();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    initialize();
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  useEvent("keydown", handleKeyDown);

  return (
    <div className="main-box">
      {data.map((row, rowIndex) => (
        <div className="box">
          {row.map((num, index) => (
            <Column key={index} num={num} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Main;
