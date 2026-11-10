
import React, { useState, useEffect } from "react";

const DropsGame = () => {
  // ==========================================
  // 1. GAME STATES
  // ==========================================

  const [activePlayer, setActivePlayer] = useState(1);
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);

  const [basketX, setBasketX] = useState(45);
  const [basketY, setBasketY] = useState(82);

  const [drops, setDrops] = useState([]);
  const [timer, setTimer] = useState(15);
  const [gameRunning, setGameRunning] = useState(false);

  const [gameStatusText, setStatusText] = useState(
    'Click "Start Player 1 Match" to launch!'
  );

  // ==========================================
  // 2. TIMER
  // ==========================================

  useEffect(() => {
    if (!gameRunning) return;

    const clock = setInterval(() => {
      setTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(clock);
  }, [gameRunning]);

  // ==========================================
  // 3. KEYBOARD CONTROLS
  // ==========================================

  useEffect(() => {
    const handleNavigation = (e) => {
      if (!gameRunning) return;

      const step = 5;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setBasketX((prev) => Math.max(prev - step, 5));
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setBasketX((prev) => Math.min(prev + step, 85));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setBasketY((prev) => Math.max(prev - step, 8));
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setBasketY((prev) => Math.min(prev + step, 85));
      }
    };

    window.addEventListener("keydown", handleNavigation);

    return () => {
      window.removeEventListener("keydown", handleNavigation);
    };
  }, [gameRunning]);

  // ==========================================
  // 4. DROPS PHYSICS AND COLLISION
  // ==========================================

  useEffect(() => {
    if (!gameRunning) return;

    const physicsLoop = setInterval(() => {
      setDrops((prevDrops) => {
        const updatedDrops = [];

        prevDrops.forEach((drop) => {
          const newTop = drop.top + 2;

          // Basket boundaries
          const basketLeft = basketX;
          const basketRight = basketX + 9;

          const basketTop = basketY - 3;
          const basketBottom = basketY + 5;

          const dropLeft = drop.x - 2;
          const dropRight = drop.x + 2;

          const dropTop = newTop;
          const dropBottom = newTop + 4;

          // Collision detection
          const isColliding =
            dropRight >= basketLeft &&
            dropLeft <= basketRight &&
            dropBottom >= basketTop &&
            dropTop <= basketBottom;

          if (isColliding) {
            if (activePlayer === 1) {
              setP1Score((prev) => prev + drop.digit);
            } else if (activePlayer === 2) {
              setP2Score((prev) => prev + drop.digit);
            }

            return;
          }

          // Remove drops after leaving the game field
          if (newTop < 100) {
            updatedDrops.push({
              ...drop,
              top: newTop,
            });
          }
        });

        // Generate random drops
        if (Math.random() < 0.08) {
          updatedDrops.push({
            id: Date.now() + Math.random(),
            x: Math.floor(Math.random() * 90) + 5,
            top: 0,
            digit: Math.floor(Math.random() * 9) + 1,
          });
        }

        return updatedDrops;
      });
    }, 80);

    return () => clearInterval(physicsLoop);
  }, [gameRunning, basketX, basketY, activePlayer]);

  // ==========================================
  // 5. GAME TIMEOUT
  // ==========================================

  useEffect(() => {
    if (timer !== 0 || !gameRunning) return;

    setGameRunning(false);
    setDrops([]);

    if (activePlayer === 1) {
      setActivePlayer(2);
      setTimer(15);

      setStatusText(
        'Player 1 Time Out! Ready Player 2. Click "Start Player 2 Match".'
      );
    } else if (activePlayer === 2) {
      setActivePlayer(3);

      if (p1Score > p2Score) {
        setStatusText(
          `🎉 MATCH OVER: Player 1 Wins! (Sum: ${p1Score} vs ${p2Score})`
        );
      } else if (p2Score > p1Score) {
        setStatusText(
          `🎉 MATCH OVER: Player 2 Wins! (Sum: ${p2Score} vs ${p1Score})`
        );
      } else {
        setStatusText(
          `🤝 MATCH DRAW: Both scored an identical sum of ${p1Score}!`
        );
      }
    }
  }, [timer, gameRunning, activePlayer, p1Score, p2Score]);

  // ==========================================
  // 6. START MATCH
  // ==========================================

  const startMatchSignal = () => {
    if (activePlayer === 3) return;

    setDrops([]);
    setBasketX(45);
    setBasketY(82);
    setTimer(15);
    setGameRunning(true);

    setStatusText(
      `🔴 Player ${activePlayer} Match Live! Catch the highest numeric digits!`
    );
  };

  // ==========================================
  // 7. MOVEMENT FUNCTIONS
  // ==========================================

  const moveLeft = () => {
    setBasketX((prev) => Math.max(prev - 5, 5));
  };

  const moveRight = () => {
    setBasketX((prev) => Math.min(prev + 5, 85));
  };

  const moveUp = () => {
    setBasketY((prev) => Math.max(prev - 5, 8));
  };

  const moveDown = () => {
    setBasketY((prev) => Math.min(prev + 5, 85));
  };

  // ==========================================
  // 8. RESTART MATCH
  // ==========================================

  const handleRestart = () => {
    setActivePlayer(1);
    setP1Score(0);
    setP2Score(0);

    setTimer(15);
    setDrops([]);

    setBasketX(45);
    setBasketY(82);

    setGameRunning(false);

    setStatusText(
      'New Tournament Started! Click "Start Player 1 Match".'
    );
  };

  // ==========================================
  // 9. FULL RESET
  // ==========================================

  const handleFullReset = () => {
    handleRestart();
    setStatusText("System completely reset back to zero baseline.");
  };

  // ==========================================
  // 10. STYLES
  // ==========================================

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const movementButtonStyle = {
    flex: 1,
    padding: "12px",
    backgroundColor: "#334155",
    color: "#fff",
    border: "1px solid #475569",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    touchAction: "manipulation",
  };

  // ==========================================
  // 11. UI
  // ==========================================

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        fontFamily: '"Segoe UI", Roboto, sans-serif',
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#1e293b",
          border: "3px solid #38bdf8",
          borderRadius: "24px",
          padding: "20px",
          boxSizing: "border-box",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: "0 0 5px", color: "#38bdf8" }}>
          Math Drops Catcher 🌧️🪣
        </h2>

        <p
          style={{
            margin: "0 0 15px",
            fontSize: "12px",
            color: "#94a3b8",
          }}
        >
          Catch drops to SUM numbers • 15 Seconds Per Player
        </p>

        {/* SCOREBOARD */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px",
            backgroundColor: "#020617",
            padding: "12px",
            borderRadius: "14px",
            marginBottom: "20px",
            border: "1px solid #334155",
          }}
        >
          <div
            style={{
              borderRight: "1px solid #1e293b",
              backgroundColor:
                activePlayer === 1
                  ? "rgba(56,189,248,0.1)"
                  : "transparent",
              borderRadius: "8px",
              padding: "4px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#94a3b8" }}>
              PLAYER 1 SUM
            </div>

            <div
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#38bdf8",
              }}
            >
              {p1Score}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "10px", color: "#64748b" }}>
              CLOCK
            </div>

            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: timer <= 5 ? "#ef4444" : "#facc15",
              }}
            >
              {timer}s
            </div>
          </div>

          <div
            style={{
              borderLeft: "1px solid #1e293b",
              backgroundColor:
                activePlayer === 2
                  ? "rgba(167,139,250,0.1)"
                  : "transparent",
              borderRadius: "8px",
              padding: "4px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#94a3b8" }}>
              PLAYER 2 SUM
            </div>

            <div
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#a78bfa",
              }}
            >
              {p2Score}
            </div>
          </div>
        </div>

        {/* GAME FIELD */}

        <div
          style={{
            height: "320px",
            background:
              "linear-gradient(to bottom, #0284c7 0%, #0369a1 40%, #0f172a 100%)",
            borderRadius: "16px",
            border: "3px solid #0284c7",
            position: "relative",
            overflow: "hidden",
            marginBottom: "15px",
          }}
        >
          {/* CLOUDS */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "5px 20px",
              opacity: 0.85,
              fontSize: "32px",
              userSelect: "none",
            }}
          >
            <span>☁️</span>
            <span>☁️</span>
            <span>☁️</span>
            <span>☁️</span>
          </div>

          {/* FALLING DROPS */}

          {drops.map((drop) => (
            <div
              key={drop.id}
              style={{
                position: "absolute",
                left: `${drop.x}%`,
                top: `${drop.top}%`,
                width: "26px",
                height: "26px",
                backgroundColor: "#38bdf8",
                borderRadius: "50% 50% 50% 50% / 0% 50% 50% 50%",
                transform: "rotate(-45deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 5px rgba(56,189,248,0.5)",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  transform: "rotate(45deg)",
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#020617",
                }}
              >
                {drop.digit}
              </span>
            </div>
          ))}

          {/* PLAYER BASKET */}

          <div
            style={{
              position: "absolute",
              top: `${basketY}%`,
              left: `${basketX}%`,
              transform: "translateY(-50%)",
              transition: "left 0.06s ease-out, top 0.06s ease-out",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 10,
              width: "45px",
            }}
          >
            <div
              style={{
                width: "45px",
                height: "18px",
                backgroundColor:
                  activePlayer === 1 ? "#38bdf8" : "#a78bfa",
                borderRadius: "0 0 10px 10px",
                border: "2px solid #fff",
                boxSizing: "border-box",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              🪣 {activePlayer === 3 ? "END" : `P${activePlayer}`}
            </div>

            <div
              style={{
                fontSize: "26px",
                marginTop: "-2px",
                userSelect: "none",
              }}
            >
              🚶‍♂️
            </div>
          </div>

          {/* GROUND */}

          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "12px",
              backgroundColor: "#16a34a",
            }}
          />
        </div>

        {/* STATUS */}

        <p
          style={{
            fontStyle: "italic",
            fontSize: "14px",
            color: "#fef08a",
            minHeight: "42px",
            margin: "0 0 15px",
            padding: "0 10px",
            lineHeight: "1.4",
          }}
        >
          {gameStatusText}
        </p>

        {/* START BUTTON */}

        {!gameRunning && activePlayer !== 3 && (
          <button
            onClick={startMatchSignal}
            style={{
              ...buttonStyle,
              backgroundColor:
                activePlayer === 1 ? "#38bdf8" : "#a78bfa",
              color: "#020617",
              marginBottom: "12px",
            }}
          >
            🚀 Start Player {activePlayer} Match ({timer}s Clock)
          </button>
        )}

        {/* FOUR DIRECTION CONTROLS */}

        {gameRunning && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <button
              onClick={moveUp}
              style={{
                ...movementButtonStyle,
                maxWidth: "120px",
              }}
            >
              ⬆️ UP
            </button>

            <div
              style={{
                display: "flex",
                gap: "10px",
                width: "100%",
              }}
            >
              <button
                onClick={moveLeft}
                style={movementButtonStyle}
              >
                ⬅️ LEFT
              </button>

              <button
                onClick={moveRight}
                style={movementButtonStyle}
              >
                RIGHT ➡️
              </button>
            </div>

            <button
              onClick={moveDown}
              style={{
                ...movementButtonStyle,
                maxWidth: "120px",
              }}
            >
              ⬇️ DOWN
            </button>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "11px",
                margin: "3px 0",
              }}
            >
              Keyboard: Arrow Keys ↑ ↓ ← →
            </p>
          </div>
        )}

        {/* RESTART AND RESET */}

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleRestart}
            style={{
              ...buttonStyle,
              flex: 1,
              padding: "10px",
              backgroundColor: "#059669",
              color: "white",
              fontSize: "13px",
            }}
          >
            🔄 Restart Match
          </button>

          <button
            onClick={handleFullReset}
            style={{
              ...buttonStyle,
              flex: 1,
              padding: "10px",
              backgroundColor: "#dc2626",
              color: "white",
              fontSize: "13px",
            }}
          >
            🧹 Clear Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropsGame;
