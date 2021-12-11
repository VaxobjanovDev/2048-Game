import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import Column from "./Column";
import "./Main.css";
import { useEvent } from "./myHooks";

const Main = () => {
  let ARROW_LEFT = 37; 
  let ARROW_RIGHT = 39;
  let ARROW_UP = 38;
  let ARROW_DOWN = 40;
 

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState([]);
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

    while (!added) {
      if (boxFull) {
        break;
      }

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      if (newBox[rand1][rand2] === 0) {
        newBox[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
    }
  };

  // Swipe left

  const swipeLeft = (check) => {
    console.log("SwipeLeft")

    let oldBox = data;
    let newArray = cloneDeep(data);

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
            console.log(b[slow])
            console.log(score)
            if (b[slow] !== 0) {
              setScore(score + b[slow]);
              b[fast]=0
            }
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
    if (check) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeRight = (check) => {
    console.log("SwipeRight")

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
            if(b[slow]!==0){
              setScore(score+b[slow])
            }
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
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addItem(newArray);
    }
    if (check) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeUp = (check) => {
    console.log("SwipeUp")
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
            setScore(score+b[slow][i])
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

    if (check) {
      return b;
    } else {
      setData(b);
    }
  };

  const swipeDown = (check) => { 
    console.log("SwipeDown")
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
            console.log(b[slow][i]);
            setScore(score+b[slow][i])
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
    if (check) {
      return b;
    } else {
      setData(b);
    }
  };

  const checkIfGameOver = () => {
    let checker = swipeLeft(true);
    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false;
    }
    let checker1 = swipeRight(true);
    if (JSON.stringify(data) !== JSON.stringify(checker1)) {
      return false;
    }
    let checker2 = swipeUp(true);
    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
      return false;
    }
    let checker3 = swipeDown(true);
    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
      return false;
    }
    return true;
  };
  // Handle key function

  const handleKeyDown = (event) => {
    if (gameOver) {
      return;
    }
    // if(event.key ==="Enter"){
    //   swipeDown()
    // }
    switch (event.keyCode) {
      // case ARROW_LEFT:
      //   swipeLeft();
      //   break;
      case ARROW_UP:
        swipeUp();
        break;
      case ARROW_RIGHT:
        swipeRight();
        break;
      case ARROW_DOWN:
        swipeDown();
        break;
      default:
        break;
    }

    let gameOverr = checkIfGameOver();
    if (gameOverr) {
      setGameOver(true);
      setBestScore([score]);
    }
  };

  //Check Game Over

  // reset
  const resetGame = () => {
    const emptyBox = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    addItem(emptyBox);
    addItem(emptyBox);
    setData(emptyBox);
    setGameOver(false);
    setScore(0);
    console.log(bestScore.length);
  };

  useEffect(() => {
    // window.addEventListener("onkeypress",handleKeyDown)
    initialize();
  }, []);

  useEvent("keyup", handleKeyDown);

  return (
    <div className="container">
      <div className="header">
        <div className="text-header">
          <h1>2048</h1>
          <p>
            Join the tiles, get to <span>2048!</span>
          </p>
          <button className="btn">How to play →</button>
        </div>
        <div className="table">
          <div className="score">
            <div className="col">
              <p>Score</p>
              <p>{score}</p>
            </div>
            <div className="col col-2">
              <p>Best</p>
              {bestScore.length === 0 ? (
                <p>{score}</p>
              ) : (
                <p>{Math.max(...bestScore)}</p>
              )}
            </div>
          </div>
          <button onClick={resetGame}>New Game</button>
        </div>
      </div>
      <div className="main-box">
        {data.map((row, rowIndex) => (
          <div className="box">
            {row.map((num, index) => (
              <Column key={index} num={num} />
            ))}
          </div>
        ))}
        {gameOver && (
          <div className="game-over">
            <h2>Game Over!</h2>
            <button onClick={resetGame}>Try again</button>
          </div>
        )}
      </div>
      <div className="footer">
        <h1>
          <span>HOW TO PLAY</span>: Use your <span>arrow keys</span> to move the
          tiles. Tiles with the same number <span>merge into one</span> when
          they touch. Add them up to reach <span>2048</span>!
        </h1>
        <button className="btn">Start playing →</button>
      </div>
    </div>
  );
};

export default Main;
