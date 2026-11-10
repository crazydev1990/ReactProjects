
import React, { useState, useEffect } from "react";

const SnakeGame = () => {

  // 1. Game Settings
  const initialSnake = [
    { row: 5, col: 5 },
    { row: 5, col: 4 },
    { row: 5, col: 3 },
  ];

  const gridSize = 10;
  const targetScore = 100;

  // 2. States
  const [snake, setSnake] = useState(initialSnake);

  const [food, setFood] = useState({
    row: 2,
    col: 5,
  });

  const [direction, setDirection] = useState("right");

  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  const [gameWon, setGameWon] = useState(false);

  const [gameRunning, setGameRunning] = useState(false);

  // 3. Generate Food
  const generateFood = (currentSnake) => {

    let newFood;

    do {
      newFood = {
        row: Math.floor(Math.random() * gridSize),
        col: Math.floor(Math.random() * gridSize),
      };

    } while (
      currentSnake.some(
        (part) =>
          part.row === newFood.row &&
          part.col === newFood.col
      )
    );

    return newFood;
  };

  // 4. Move Snake
  const moveSnake = () => {

    if (gameOver || gameWon || !gameRunning) {
      return;
    }

    const head = snake[0];

    let newHead = {
      row: head.row,
      col: head.col,
    };

    // Up
    if (direction === "up") {
      newHead.row--;
    }

    // Down
    if (direction === "down") {
      newHead.row++;
    }

    // Left
    if (direction === "left") {
      newHead.col--;
    }

    // Right
    if (direction === "right") {
      newHead.col++;
    }

    // Wall Collision
    if (
      newHead.row < 0 ||
      newHead.row >= gridSize ||
      newHead.col < 0 ||
      newHead.col >= gridSize
    ) {
      setGameOver(true);
      setGameRunning(false);
      return;
    }

    // Check Food
    const eatingFood =
      newHead.row === food.row &&
      newHead.col === food.col;

    // Check Snake Body Collision
    const bodyToCheck = eatingFood
      ? snake
      : snake.slice(0, -1);

    const hitBody = bodyToCheck.some(
      (part) =>
        part.row === newHead.row &&
        part.col === newHead.col
    );

    if (hitBody) {
      setGameOver(true);
      setGameRunning(false);
      return;
    }

    // Move Snake
    let newSnake = [newHead, ...snake];

    // Eat Food
    if (eatingFood) {

      setScore((prevScore) => prevScore + 10);

      const nextFood = generateFood(newSnake);

      setFood(nextFood);

      // Check Winning Score
      if (score + 10 >= targetScore) {
        setGameWon(true);
        setGameRunning(false);
        return;
      }

    } else {

      // Remove Last Body Part
      newSnake.pop();

    }

    setSnake(newSnake);
  };

  // 5. Game Timer
  useEffect(() => {

    if (!gameRunning || gameOver || gameWon) {
      return;
    }

    const timer = setInterval(() => {
      moveSnake();
    }, 300);

    return () => clearInterval(timer);

  }, [snake, direction, food, gameRunning, gameOver, gameWon]);

  // 6. Keyboard Controls
  useEffect(() => {

    const handleKeyPress = (event) => {

      if (!gameRunning) {
        return;
      }

      const key = event.key;

      if (
        key === "ArrowUp" &&
        direction !== "down"
      ) {
        event.preventDefault();
        setDirection("up");
      }

      if (
        key === "ArrowDown" &&
        direction !== "up"
      ) {
        event.preventDefault();
        setDirection("down");
      }

      if (
        key === "ArrowLeft" &&
        direction !== "right"
      ) {
        event.preventDefault();
        setDirection("left");
      }

      if (
        key === "ArrowRight" &&
        direction !== "left"
      ) {
        event.preventDefault();
        setDirection("right");
      }

    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };

  }, [direction, gameRunning]);

  // 7. Mobile Movement
  const changeDirection = (newDirection) => {

    if (!gameRunning) {
      return;
    }

    if (
      newDirection === "up" &&
      direction !== "down"
    ) {
      setDirection("up");
    }

    if (
      newDirection === "down" &&
      direction !== "up"
    ) {
      setDirection("down");
    }

    if (
      newDirection === "left" &&
      direction !== "right"
    ) {
      setDirection("left");
    }

    if (
      newDirection === "right" &&
      direction !== "left"
    ) {
      setDirection("right");
    }

  };

  // 8. Start Game
  const startGame = () => {
    setGameRunning(true);
  };

  // 9. Restart Game
  const restartGame = () => {

    setSnake(initialSnake);

    setFood({
      row: 2,
      col: 5,
    });

    setDirection("right");

    setScore(0);

    setGameOver(false);

    setGameWon(false);

    setGameRunning(false);
  };

  // 10. Button Style
  const buttonStyle = {
    padding: "10px 16px",
    backgroundColor: "#334155",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  };

  // 11. Game UI
  return (

    <div
      style={{
        maxWidth: "450px",
        width: "100%",
        backgroundColor: "#0f172a",
        border: "3px solid #22c55e",
        padding: "20px",
        borderRadius: "20px",
        textAlign: "center",
        margin: "0 auto",
        boxSizing: "border-box",
        color: "#fff",
      }}
    >

      <h2 style={{ color: "#22c55e" }}>
        Snake Game 🐍
      </h2>

      {/* Score */}

      <h3 style={{ color: "#facc15" }}>
        Score: {score}
      </h3>

      <p style={{ color: "#94a3b8" }}>
        Target Score: {targetScore}
      </p>

      {/* Game Over */}

      {gameOver && (
        <h2 style={{ color: "#ef4444" }}>
          💥 GAME OVER!
        </h2>
      )}

      {/* You Win */}

      {gameWon && (
        <h2 style={{ color: "#22c55e" }}>
          🎉 YOU WIN!
        </h2>
      )}

      {/* Game Grid */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 30px)`,
          gap: "2px",
          backgroundColor: "#020617",
          padding: "8px",
          borderRadius: "10px",
          width: "max-content",
          margin: "15px auto",
        }}
      >

        {Array.from({ length: gridSize }).map((_, row) => (

          Array.from({ length: gridSize }).map((_, col) => {

            const isSnake = snake.some(
              (part) => part.row === row && part.col === col
            );

            const isHead =
              snake[0].row === row &&
              snake[0].col === col;

            const isFood =
              food.row === row &&
              food.col === col;

            return (

              <div
                key={`${row}-${col}`}
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: isHead
                    ? "#16a34a"
                    : isSnake
                    ? "#4ade80"
                    : "#1e293b",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "19px",
                }}
              >

                {isHead && "🐍"}

                {!isHead && isSnake && "🟢"}

                {isFood && !isSnake && "🍎"}

              </div>

            );

          })

        ))}

      </div>

      {/* Start Button */}

      {!gameRunning && !gameOver && !gameWon && (

        <button
          onClick={startGame}
          style={{
            ...buttonStyle,
            backgroundColor: "#16a34a",
            width: "100%",
            marginBottom: "12px",
          }}
        >
          ▶️ Start Game
        </button>

      )}

      {/* Movement Controls */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          marginTop: "15px",
        }}
      >

        <button
          onClick={() => changeDirection("up")}
          style={buttonStyle}
        >
          ⬆️ Up
        </button>

        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >

          <button
            onClick={() => changeDirection("left")}
            style={buttonStyle}
          >
            ⬅️ Left
          </button>

          <button
            onClick={() => changeDirection("right")}
            style={buttonStyle}
          >
            Right ➡️
          </button>

        </div>

        <button
          onClick={() => changeDirection("down")}
          style={buttonStyle}
        >
          ⬇️ Down
        </button>

      </div>

      {/* Restart Button */}

      {(gameOver || gameWon) && (

        <button
          onClick={restartGame}
          style={{
            ...buttonStyle,
            backgroundColor: "#16a34a",
            width: "100%",
            marginTop: "15px",
          }}
        >
          🔄 Restart Game
        </button>

      )}

    </div>

  );
};

export default SnakeGame;
