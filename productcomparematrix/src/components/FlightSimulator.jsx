
import React, { useState, useEffect, useRef, useCallback } from "react";

const INITIAL_CLOUDS = () => [
  { x: 430, y: 75, size: 28 },
  { x: 620, y: 165, size: 35 },
  { x: 850, y: 100, size: 25 },
  { x: 1050, y: 190, size: 30 },
  { x: 1250, y: 65, size: 32 }
];

const createInitialState = () => ({
  planeY: 150,
  planeSpeed: 60,
  fuelLevel: 100,
  distanceTraveled: 0,
  clouds: INITIAL_CLOUDS(),
  engineFailed: false
});

const FlightSimulator = () => {
  const [altitude, setAltitude] = useState(90);
  const [speed, setSpeed] = useState(60);
  const [fuel, setFuel] = useState(100);
  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const [statusMessage, setStatusMessage] = useState(
    "🎮 Use Arrow Keys to control your aircraft!"
  );

  const canvasRef = useRef(null);
  const stateRef = useRef(createInitialState());

  // Keyboard and button controls
  const controlFlight = useCallback(
    (key) => {
      if (gameOver || gameWon) return;

      const state = stateRef.current;

      switch (key) {
        case "ArrowUp":
          state.planeY = Math.max(state.planeY - 8, 20);
          break;

        case "ArrowDown":
          state.planeY = Math.min(state.planeY + 8, 235);
          break;

        case "ArrowLeft":
          state.planeSpeed = Math.max(state.planeSpeed - 5, 20);
          break;

        case "ArrowRight":
          if (state.fuelLevel > 0) {
            state.planeSpeed = Math.min(state.planeSpeed + 5, 120);
          }
          break;

        default:
          return;
      }

      setAltitude(Math.max(0, Math.floor(240 - state.planeY)));
      setSpeed(state.planeSpeed);
    },
    [gameOver, gameWon]
  );

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const supportedKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
      ];

      if (supportedKeys.includes(e.key)) {
        e.preventDefault();
        controlFlight(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [controlFlight]);

  // Canvas game animation
  useEffect(() => {
    if (gameOver || gameWon) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let frameCount = 0;
    let stopped = false;

    const drawCloud = (cloud) => {
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();

      ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
      ctx.arc(
        cloud.x + cloud.size,
        cloud.y - 10,
        cloud.size * 1.1,
        0,
        Math.PI * 2
      );
      ctx.arc(
        cloud.x + cloud.size * 2,
        cloud.y,
        cloud.size,
        0,
        Math.PI * 2
      );

      ctx.fill();
    };

    const drawPlane = (y) => {
      // Aircraft body
      ctx.fillStyle = "#e2e8f0";
      ctx.beginPath();
      ctx.ellipse(60, y, 23, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      // Main wing
      ctx.fillStyle = "#cbd5e1";
      ctx.beginPath();
      ctx.moveTo(55, y);
      ctx.lineTo(80, y - 22);
      ctx.lineTo(90, y);
      ctx.lineTo(80, y + 12);
      ctx.closePath();
      ctx.fill();

      // Tail
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.moveTo(42, y);
      ctx.lineTo(32, y - 17);
      ctx.lineTo(52, y - 4);
      ctx.closePath();
      ctx.fill();

      // Cockpit
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(70, y - 3, 5, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawRunway = (distance) => {
      if (distance < 1800) return;

      ctx.fillStyle = "#334155";
      ctx.fillRect(145, 235, 255, 20);

      ctx.fillStyle = "#ffffff";

      for (let x = 160; x < 380; x += 55) {
        ctx.fillRect(x, 244, 30, 3);
      }
    };

    const finishGame = (won, message) => {
      if (stopped) return;

      stopped = true;

      if (won) {
        setGameWon(true);
      } else {
        setGameOver(true);
      }

      setStatusMessage(message);
    };

    const renderGameFrame = () => {
      if (stopped) return;

      const state = stateRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky
      const skyGradient = ctx.createLinearGradient(0, 0, 0, 240);
      skyGradient.addColorStop(0, "#0284c7");
      skyGradient.addColorStop(1, "#7dd3fc");

      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, 240);

      // Ground
      ctx.fillStyle = "#16a34a";
      ctx.fillRect(0, 240, canvas.width, 40);

      // Runway
      drawRunway(state.distanceTraveled);

      // Clouds and collision detection
      for (const cloud of state.clouds) {
        drawCloud(cloud);

        cloud.x -= state.planeSpeed * 0.05;

        if (cloud.x < -100) {
          cloud.x = canvas.width + Math.random() * 300;
          cloud.y = 35 + Math.random() * 150;
          cloud.size = 22 + Math.random() * 18;
        }

        const distX = Math.abs(60 - (cloud.x + cloud.size));
        const distY = Math.abs(state.planeY - cloud.y);

        if (distX < cloud.size + 18 && distY < cloud.size + 10) {
          finishGame(
            false,
            "💥 Aircraft collided with a storm cloud! Game Over!"
          );
          return;
        }
      }

      // Aircraft
      drawPlane(state.planeY);

      // Distance calculation
      state.distanceTraveled += state.planeSpeed * 0.1;

      // Fuel consumption
      if (state.fuelLevel > 0) {
        state.fuelLevel = Math.max(
          state.fuelLevel - 0.008,
          0
        );
      }

      // Engine failure
      if (state.fuelLevel <= 0 && !state.engineFailed) {
        state.engineFailed = true;

        setStatusMessage(
          "⚠️ Fuel empty! Engine failure! Aircraft is descending."
        );
      }

      if (state.engineFailed && state.planeY < 235) {
        state.planeY = Math.min(state.planeY + 0.45, 235);
      }

      // Landing detection
      if (state.planeY >= 235) {
        if (
          state.distanceTraveled >= 1800 &&
          state.planeSpeed <= 40 &&
          state.planeSpeed >= 20 &&
          state.fuelLevel > 0
        ) {
          finishGame(
            true,
            "🎉 Excellent Landing! You successfully completed the flight!"
          );
        } else {
          finishGame(
            false,
            "💥 Hard Landing! Reach the runway and reduce your speed before landing."
          );
        }

        return;
      }

      // Update React UI periodically instead of every frame
      frameCount++;

      if (frameCount % 8 === 0) {
        setScore(Math.floor(state.distanceTraveled));
        setFuel(Math.floor(state.fuelLevel));
        setAltitude(Math.max(0, Math.floor(240 - state.planeY)));
        setSpeed(state.planeSpeed);
      }

      animationFrameId = requestAnimationFrame(renderGameFrame);
    };

    animationFrameId = requestAnimationFrame(renderGameFrame);

    return () => {
      stopped = true;
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameOver, gameWon]);

  // Restart game
  const rebootFlightEngine = () => {
    stateRef.current = createInitialState();

    setAltitude(90);
    setSpeed(60);
    setFuel(100);
    setScore(0);

    setGameOver(false);
    setGameWon(false);

    setStatusMessage(
      "Flight restarted! Take control of your aircraft."
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Flight Simulator ✈️</h2>

      <p style={styles.subtitle}>
        HTML5 Canvas Flight Game
      </p>

      {/* Dashboard */}
      <div style={styles.dashboard}>
        <div>
          <span style={styles.label}>ALTITUDE</span>
          <strong style={{ color: "#38bdf8" }}>
            {altitude * 10} ft
          </strong>
        </div>

        <div>
          <span style={styles.label}>AIRSPEED</span>
          <strong style={{ color: "#eab308" }}>
            {speed} kn
          </strong>
        </div>

        <div>
          <span style={styles.label}>FUEL</span>
          <strong style={{ color: fuel < 30 ? "#ef4444" : "#22c55e" }}>
            {fuel}%
          </strong>
        </div>
      </div>

      {/* Canvas */}
      <div style={styles.canvasWrapper}>
        <canvas
          ref={canvasRef}
          width={380}
          height={280}
          style={styles.canvas}
        />
      </div>

      {/* Score */}
      <div style={styles.score}>
        Distance: {score} / 1800
      </div>

      {/* Progress */}
      <div style={styles.progressBackground}>
        <div
          style={{
            ...styles.progressBar,
            width: `${Math.min((score / 1800) * 100, 100)}%`
          }}
        />
      </div>

      {/* Status */}
      <div
        style={{
          ...styles.status,
          color: gameWon
            ? "#22c55e"
            : gameOver
            ? "#ef4444"
            : "#cbd5e1"
        }}
      >
        {statusMessage}
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <button
          onClick={() => controlFlight("ArrowUp")}
          disabled={gameOver || gameWon}
          style={styles.controlButton}
        >
          🔼 PITCH UP
        </button>

        <div style={styles.middleControls}>
          <button
            onClick={() => controlFlight("ArrowLeft")}
            disabled={gameOver || gameWon}
            style={styles.controlButton}
          >
            ◀ THROTTLE -
          </button>

          <button
            onClick={() => controlFlight("ArrowRight")}
            disabled={gameOver || gameWon}
            style={styles.controlButton}
          >
            THROTTLE + ▶
          </button>
        </div>

        <button
          onClick={() => controlFlight("ArrowDown")}
          disabled={gameOver || gameWon}
          style={styles.controlButton}
        >
          🔽 PITCH DOWN
        </button>
      </div>

      {/* Restart */}
      {(gameOver || gameWon) && (
        <h3 style={{ color: gameWon ? "#22c55e" : "#ef4444" }}>
          {gameWon ? "MISSION COMPLETED!" : "MISSION FAILED!"}
        </h3>
      )}

      <button
        onClick={rebootFlightEngine}
        style={styles.restartButton}
      >
        🔄 Restart Flight
      </button>

      <p style={styles.help}>
        Keyboard: ↑ Pitch Up | ↓ Pitch Down | ← Slow Down | → Speed Up
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "550px",
    width: "100%",
    margin: "30px auto",
    padding: "22px",
    boxSizing: "border-box",
    background: "#0f172a",
    border: "2px solid #38bdf8",
    borderRadius: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)"
  },

  heading: {
    color: "#38bdf8",
    margin: "0 0 5px"
  },

  subtitle: {
    color: "#64748b",
    fontSize: "12px",
    marginBottom: "22px"
  },

  dashboard: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
    padding: "15px 8px",
    background: "#020617",
    borderRadius: "12px",
    marginBottom: "18px"
  },

  label: {
    display: "block",
    color: "#64748b",
    fontSize: "11px",
    marginBottom: "7px"
  },

  canvasWrapper: {
    width: "100%",
    overflow: "hidden",
    border: "3px solid #1e293b",
    borderRadius: "12px",
    background: "#020617"
  },

  canvas: {
    display: "block",
    width: "100%",
    height: "auto"
  },

  score: {
    color: "#e2e8f0",
    fontSize: "13px",
    fontWeight: "bold",
    marginTop: "15px"
  },

  progressBackground: {
    height: "8px",
    background: "#334155",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "9px"
  },

  progressBar: {
    height: "100%",
    background: "#38bdf8",
    transition: "width 0.2s"
  },

  status: {
    minHeight: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    lineHeight: "1.5",
    margin: "15px 0"
  },

  controls: {
    display: "flex",
    flexDirection: "column",
    gap: "9px",
    padding: "13px",
    background: "#020617",
    borderRadius: "12px"
  },

  middleControls: {
    display: "flex",
    gap: "9px"
  },

  controlButton: {
    flex: 1,
    padding: "11px 8px",
    background: "#334155",
    color: "#fff",
    border: "1px solid #475569",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "11px"
  },

  restartButton: {
    width: "100%",
    padding: "13px",
    marginTop: "17px",
    background: "#38bdf8",
    color: "#020617",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px"
  },

  help: {
    color: "#64748b",
    fontSize: "11px",
    lineHeight: "1.6",
    marginTop: "15px"
  }
};

export default FlightSimulator;
