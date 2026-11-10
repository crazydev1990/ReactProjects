
import React, { useState, useEffect } from "react";

const BomberGame = () => {

  // 1. Game Map
  const initialMap = [
    ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["W", "E", ".", "B", ".", "B", ".", "E", "W"],
    ["W", ".", "W", "B", "W", "B", "W", ".", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
  ];

  // 2. States
  const [mapGrid, setMapGrid] = useState(initialMap);

  const [playerPos, setPlayerPos] = useState({
    row: 1,
    col: 1,
  });

  const [score, setScore] = useState(0);

  const [bomb, setBomb] = useState(null);

  const [explosion, setExplosions] = useState([]);

  const [gameOver, setGameOver] = useState(false);

  const [gameWon, setGameWon] = useState(false);

  // 3. Check Player Hit By Blast
  useEffect(() => {

    const playerHit = explosion.some((item) => {
      return (
        item.r === playerPos.row &&
        item.c === playerPos.col
      );
    });

    if (playerHit) {
      setGameOver(true);
    }

  }, [explosion, playerPos]);

  // 4. Player Movement
  const movePlayer = (direction) => {

    // Stop movement after Game Over or Win
    if (gameOver || gameWon) {
      return;
    }

    let row = playerPos.row;
    let col = playerPos.col;

    // Up
    if (direction === "up") {
      row--;
    }

    // Down
    if (direction === "down") {
      row++;
    }

    // Left
    if (direction === "left") {
      col--;
    }

    // Right
    if (direction === "right") {
      col++;
    }

    // Check Map Boundary
    if (!mapGrid[row] || mapGrid[row][col] === undefined) {
      return;
    }

    // Check Wall and Brick
    if (mapGrid[row][col] === "W" || mapGrid[row][col] === "B") {
      return;
    }

    // Collect Coin
    if (mapGrid[row][col] === ".") {

      const newMap = mapGrid.map((oldRow) => [...oldRow]);

      newMap[row][col] = "E";

      setMapGrid(newMap);

      setScore((prevScore) => prevScore + 10);

      // Check Remaining Coins and Bricks
      let remainingItems = 0;

      newMap.forEach((mapRow) => {
        mapRow.forEach((cell) => {
          if (cell === "." || cell === "B") {
            remainingItems++;
          }
        });
      });

      // All Coins Collected
      if (remainingItems === 0) {
        setGameWon(true);
      }
    }

    // Update Player Position
    setPlayerPos({
      row: row,
      col: col,
    });
  };

  // 5. Drop Bomb
  const dropBomb = () => {

    // Stop bomb after Game Over or Win
    if (gameOver || gameWon) {
      return;
    }

    // Only one bomb at a time
    if (bomb !== null || explosion.length > 0) {
      return;
    }

    const currentBomb = {
      row: playerPos.row,
      col: playerPos.col,
    };

    setBomb(currentBomb);

    // Bomb explodes after 2 seconds
    setTimeout(() => {

      setBomb(null);

      const blast = [
        { r: currentBomb.row, c: currentBomb.col },
        { r: currentBomb.row - 1, c: currentBomb.col },
        { r: currentBomb.row + 1, c: currentBomb.col },
        { r: currentBomb.row, c: currentBomb.col - 1 },
        { r: currentBomb.row, c: currentBomb.col + 1 },
      ];

      // Show Explosion
      setExplosions(blast);

      // Destroy Nearby Bricks
      setMapGrid((oldMap) => {

        const newMap = oldMap.map((oldRow) => [...oldRow]);

        blast.forEach((position) => {

          if (
            newMap[position.r] &&
            newMap[position.r][position.c] === "B"
          ) {
            newMap[position.r][position.c] = ".";
          }

        });

        return newMap;
      });

      // Remove Explosion After 500ms
      setTimeout(() => {
        setExplosions([]);
      }, 500);

    }, 2000);
  };

  // 6. Restart Game
  const restartGame = () => {

    setMapGrid(initialMap);

    setPlayerPos({
      row: 1,
      col: 1,
    });

    setScore(0);

    setBomb(null);

    setExplosions([]);

    setGameOver(false);

    setGameWon(false);
  };

  // 7. Game UI
  return (

    <div
      style={{
        maxWidth: "450px",
        width: "100%",
        backgroundColor: "#0f172a",
        border: "3px solid #facc15",
        padding: "20px",
        borderRadius: "20px",
        textAlign: "center",
        margin: "0 auto",
        boxSizing: "border-box",
        color: "#fff",
      }}
    >

      <h3
        style={{
          color: "#facc15",
          margin: "0 0 10px 0",
        }}
      >
        PicPac Bomber 💣
      </h3>

      {/* Score */}

      <h4 style={{ color: "#facc15" }}>
        Score: {score}
      </h4>

      {/* Game Won Message */}

      {gameWon && (
        <div
          style={{
            backgroundColor: "#166534",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <h2 style={{ margin: "0 0 5px" }}>
            🎉 YOU WIN!
          </h2>

          <p style={{ margin: 0 }}>
            Congratulations! All Coins Collected!
          </p>

          <h3 style={{ margin: "8px 0 0" }}>
            Final Score: {score}
          </h3>
        </div>
      )}

      {/* Game Over Message */}

      {gameOver && (
        <div
          style={{
            backgroundColor: "#991b1b",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <h2 style={{ margin: "0 0 5px" }}>
            💥 GAME OVER!
          </h2>

          <p style={{ margin: 0 }}>
            Player was hit by the bomb blast!
          </p>
        </div>
      )}

      {/* Game Map */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          backgroundColor: "#020617",
          padding: "10px",
          borderRadius: "10px",
          width: "max-content",
          margin: "0 auto",
        }}
      >

        {mapGrid.map((row, r) => (

          <div
            key={r}
            style={{
              display: "flex",
              gap: "3px",
            }}
          >

            {row.map((cell, c) => {

              const isPlayer =
                playerPos.row === r &&
                playerPos.col === c;

              const isBomb =
                bomb !== null &&
                bomb.row === r &&
                bomb.col === c;

              const isExplosion = explosion.some(
                (item) => item.r === r && item.c === c
              );

              let backgroundColor = "#0f172a";
              let emoji = "";

              // Wall
              if (cell === "W") {
                backgroundColor = "#475569";
              }

              // Brick
              if (cell === "B") {
                backgroundColor = "#854d0e";
                emoji = "🧱";
              }

              // Coin
              if (cell === ".") {
                emoji = "🟡";
              }

              // Explosion
              if (isExplosion) {
                backgroundColor = "#ef4444";
                emoji = "🔥";
              }

              // Bomb
              if (isBomb) {
                emoji = "💣";
              }

              // Player
              if (isPlayer) {
                emoji = gameOver ? "💀" : "😮";
              }

              return (

                <div
                  key={c}
                  style={{
                    width: "35px",
                    height: "35px",
                    backgroundColor: backgroundColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "4px",
                    fontSize: "20px",
                  }}
                >
                  {emoji}
                </div>

              );

            })}

          </div>

        ))}

      </div>

      {/* Movement Controls */}

      {!gameOver && !gameWon && (

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            marginTop: "15px",
          }}
        >

          {/* Up Button */}

          <button
            onClick={() => movePlayer("up")}
            style={buttonStyle}
          >
            ⬆️ Up
          </button>

          {/* Left, Bomb, Right */}

          <div
            style={{
              display: "flex",
              gap: "6px",
            }}
          >

            <button
              onClick={() => movePlayer("left")}
              style={buttonStyle}
            >
              ◀️ Left
            </button>

            <button
              onClick={dropBomb}
              style={{
                ...buttonStyle,
                backgroundColor: "#ef4444",
              }}
            >
              💣 Bomb
            </button>

            <button
              onClick={() => movePlayer("right")}
              style={buttonStyle}
            >
              Right ▶️
            </button>

          </div>

          {/* Down Button */}

          <button
            onClick={() => movePlayer("down")}
            style={buttonStyle}
          >
            ⬇️ Down
          </button>

        </div>

      )}

      {/* Restart Button */}

      {(gameOver || gameWon) && (

        <button
          onClick={restartGame}
          style={{
            ...buttonStyle,
            backgroundColor: "#16a34a",
            marginTop: "15px",
            width: "100%",
          }}
        >
          🔄 Restart Game
        </button>

      )}

    </div>

  );
};

// 8. Common Button Style

const buttonStyle = {
  padding: "8px 12px",
  backgroundColor: "#334155",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
};

export default BomberGame;
