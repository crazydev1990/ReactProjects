
import React, { useState } from "react";

// Game Component Imports
import DropsGame from "./components/DropsGame";
import BomberGame from "./components/BomberGame";
import ShellGame from "./components/ShellGame";
import SnakeGame from "./components/SnakeGame";

const App = () => {

  // Active Tab State
  // 1 = Drops
  // 2 = Bomber
  // 3 = Glass Spin
  // 4 = Snake

  const [activeTab, setActiveTab] = useState(1);

  return (

    <div
      style={{
        backgroundColor: "#020617",
        minHeight: "100vh",
        color: "#fff",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >

      {/* Games Tabs Menu */}

      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto 30px auto",
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "#0f172a",
          padding: "6px",
          borderRadius: "30px",
          border: "1px solid #1e293b",
          gap: "4px",
        }}
      >

        {/* Drops Tab */}

        <button
          onClick={() => setActiveTab(1)}
          style={{
            ...tabStyle,
            backgroundColor:
              activeTab === 1 ? "#38bdf8" : "transparent",
            color:
              activeTab === 1 ? "#020617" : "#94a3b8",
          }}
        >
          🌧️ Drops
        </button>

        {/* Bomber Tab */}

        <button
          onClick={() => setActiveTab(2)}
          style={{
            ...tabStyle,
            backgroundColor:
              activeTab === 2 ? "#facc15" : "transparent",
            color:
              activeTab === 2 ? "#020617" : "#94a3b8",
          }}
        >
          💣 Bomber
        </button>

        {/* Glass Spin Tab */}

        <button
          onClick={() => setActiveTab(3)}
          style={{
            ...tabStyle,
            backgroundColor:
              activeTab === 3 ? "#eab308" : "transparent",
            color:
              activeTab === 3 ? "#020617" : "#94a3b8",
          }}
        >
          🪙 Glass Spin
        </button>

        {/* Snake Tab */}

        <button
          onClick={() => setActiveTab(4)}
          style={{
            ...tabStyle,
            backgroundColor:
              activeTab === 4 ? "#22c55e" : "transparent",
            color:
              activeTab === 4 ? "#020617" : "#94a3b8",
          }}
        >
          🐍 Snake
        </button>

      </div>

      {/* Dynamic Game Container */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        {activeTab === 1 && <DropsGame />}

        {activeTab === 2 && <BomberGame />}

        {activeTab === 3 && <ShellGame />}

        {activeTab === 4 && <SnakeGame />}

      </div>

    </div>

  );
};

// Common Tab Button Style

const tabStyle = {
  flex: "1 1 100px",
  padding: "12px 6px",
  borderRadius: "25px",
  border: "none",
  fontSize: "12px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.2s",
};

export default App;
