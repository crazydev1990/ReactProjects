
import React, { useState, useEffect, useRef } from "react";

const cartoonSuperstars = [
  {
    name: "Bagira",
    show: "Jungle Book",
    image: "/cartoon/bagira.jpg",
    emoji: "🐈‍⬛",
  },
  {
    name: "Balloo",
    show: "Jungle Book",
    image: "/cartoon/balloo.png",
    emoji: "🐻",
  },
  {
    name: "Bob the Builder",
    show: "Bob the Builder",
    image: "/cartoon/bobthebuilder.png",
    emoji: "👷",
  },
  {
    name: "Bulbasaur",
    show: "Pokemon",
    image: "/cartoon/bulbasaur.jpg",
    emoji: "🌿",
  },
  {
    name: "Charizard",
    show: "Pokemon",
    image: "/cartoon/charizard.jpg",
    emoji: "🔥",
  },
  {
    name: "Chip and Dale",
    show: "Chip and Dale",
    image: "/cartoon/chipndale.jpg",
    emoji: "🐿️",
  },
  {
    name: "Donald Duck",
    show: "Disney",
    image: "/cartoon/donaldduck.png",
    emoji: "🦆",
  },
  {
    name: "Doraemon",
    show: "Doraemon",
    image: "/cartoon/doremon.png",
    emoji: "🤖",
  },
  {
    name: "Goofy",
    show: "Disney",
    image: "/cartoon/goofie.png",
    emoji: "🐶",
  },
  {
    name: "Jerry",
    show: "Tom and Jerry",
    image: "/cartoon/jerry.jpg",
    emoji: "🐭",
  },
  {
    name: "Mickey Mouse",
    show: "Disney",
    image: "/cartoon/mickey.jpg",
    emoji: "🐭",
  },
  {
    name: "Mowgli",
    show: "Jungle Book",
    image: "/cartoon/mogli.jpg",
    emoji: "🧒",
  },
  {
    name: "Pikachu",
    show: "Pokemon",
    image: "/cartoon/pikachu.png",
    emoji: "⚡",
  },
  {
    name: "Popeye",
    show: "Popeye",
    image: "/cartoon/popeye.jpg",
    emoji: "💪",
  },
  {
    name: "Road Runner",
    show: "Looney Tunes",
    image: "/cartoon/roadrunner.jpg",
    emoji: "🐦",
  },
  {
    name: "Road Runner Fox",
    show: "Looney Tunes",
    image: "/cartoon/roadrunnerfox.png",
    emoji: "🦊",
  },
  {
    name: "Scooby Doo",
    show: "Scooby Doo",
    image: "/cartoon/scoobydoo.png",
    emoji: "🐕",
  },
  {
    name: "Sher Khan",
    show: "Jungle Book",
    image: "/cartoon/sherkhan.jpg",
    emoji: "🐅",
  },
  {
    name: "Spike",
    show: "Tom and Jerry",
    image: "/cartoon/Spike.jpg",
    emoji: "🐶",
  },
  {
    name: "Squirtle",
    show: "Pokemon",
    image: "/cartoon/squirtle.jpg",
    emoji: "💧",
  },
  {
    name: "Tom",
    show: "Tom and Jerry",
    image: "/cartoon/tom.jpg",
    emoji: "🐱",
  },
];

const PlayerAvatar = ({ player, size = 60, borderColor = "#facc15" }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [player.image]);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#fff",
        border: `3px solid ${borderColor}`,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      {!imageError ? (
        <img
          src={player.image}
          alt={player.name}
          onError={() => setImageError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <span style={{ fontSize: size * 0.55 }}>{player.emoji}</span>
      )}
    </div>
  );
};

const DoodleCricket = () => {
  const [batter, setBatter] = useState(cartoonSuperstars[0]);
  const [bowler, setBowler] = useState(cartoonSuperstars[1]);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [wickets, setWickets] = useState(0);

  const [ballProgress, setBallProgress] = useState(0);
  const [isBallFlying, setIsBallFlying] = useState(false);
  const [isBatSwinging, setIsBatSwinging] = useState(false);

  const [commentary, setCommentary] = useState(
    'Press "Bowl Delivery" button to start match..!'
  );

  const [umpireSignal, setUmpireSignal] = useState("");

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const swingTimeoutRef = useRef(null);

  const scoreRef = useRef(score);
  const ballFlyingRef = useRef(false);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const cyclePlayers = () => {
    const randomBatter =
      cartoonSuperstars[
        Math.floor(Math.random() * cartoonSuperstars.length)
      ];

    let randomBowler;

    do {
      randomBowler =
        cartoonSuperstars[
          Math.floor(Math.random() * cartoonSuperstars.length)
        ];
    } while (randomBowler.name === randomBatter.name);

    setBatter(randomBatter);
    setBowler(randomBowler);
  };

  useEffect(() => {
    cyclePlayers();

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
      clearTimeout(swingTimeoutRef.current);
    };
  }, []);

  const finishBall = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);

    intervalRef.current = null;
    timeoutRef.current = null;

    ballFlyingRef.current = false;
    setIsBallFlying(false);
    setBallProgress(0);
  };

  const addWicket = (signal, message) => {
    setWickets((previous) => {
      const updated = Math.min(previous + 1, 3);

      if (updated >= 3) {
        setHighScore((old) => Math.max(old, scoreRef.current));
      }

      return updated;
    });

    setUmpireSignal(signal);
    setCommentary(message);
    cyclePlayers();
  };

  const deliverBall = () => {
    if (wickets >= 3 || ballFlyingRef.current) return;

    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);

    ballFlyingRef.current = true;
    setIsBallFlying(true);
    setBallProgress(0);
    setUmpireSignal("");

    setCommentary(
      `🥎 ${bowler.name} (${bowler.show}) is ready for bawling!`
    );

    let currentTrack = 0;

    intervalRef.current = setInterval(() => {
      currentTrack += 5;

      setBallProgress(currentTrack);

      if (currentTrack >= 100) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        timeoutRef.current = setTimeout(() => {
          if (ballFlyingRef.current) {
            ballFlyingRef.current = false;
            setIsBallFlying(false);
            setBallProgress(0);

            addWicket(
              "☝️ BOWLED OUT!",
              `🔴 Clean Bold!`
            );
          }
        }, 120);
      }
    }, 35);
  };

  const swingBat = () => {
    if (
      !ballFlyingRef.current ||
      wickets >= 3 ||
      isBatSwinging
    ) {
      return;
    }

    const finalImpact = ballProgress;

    finishBall();

    setIsBatSwinging(true);

    clearTimeout(swingTimeoutRef.current);

    swingTimeoutRef.current = setTimeout(() => {
      setIsBatSwinging(false);
    }, 250);

    if (finalImpact >= 85 && finalImpact <= 100) {
      setScore((previous) => previous + 6);
      setUmpireSignal("6️⃣ SIXER!!");

      setCommentary(
        `🚀 Sixer! `
      );
    } else if (finalImpact >= 75 && finalImpact < 85) {
      setScore((previous) => previous + 4);
      setUmpireSignal("4️⃣ FOUR!");

      setCommentary(
        `💥 Boundry! `
      );
    } else if (finalImpact >= 65 && finalImpact < 75) {
      const runs = Math.random() > 0.5 ? 2 : 1;

      if (runs === 2 && Math.random() < 0.3) {
        addWicket(
          "🏃‍♂️❌ RUN OUT!",
          `🚨 Run Out!`
        );
      } else {
        setScore((previous) => previous + runs);
        setUmpireSignal(`🏃 ${runs} RUNS`);

        setCommentary(
          `🏏 ${batter.name} takes ${runs} Runs!`
        );
      }
    } else {
      addWicket(
        "☝️ CAUGHT OUT!",
        `❌ Catch Out! `
      );
    }
  };

  useEffect(() => {
    const handleSpacebar = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        swingBat();
      }
    };

    window.addEventListener("keydown", handleSpacebar);

    return () => {
      window.removeEventListener("keydown", handleSpacebar);
    };
  });

  const restartGame = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    clearTimeout(swingTimeoutRef.current);

    intervalRef.current = null;
    timeoutRef.current = null;
    swingTimeoutRef.current = null;

    ballFlyingRef.current = false;
    scoreRef.current = 0;

    setScore(0);
    setWickets(0);
    setBallProgress(0);
    setIsBallFlying(false);
    setIsBatSwinging(false);
    setUmpireSignal("");

    setCommentary("New Tournament Match Starts! Throw Ball!");

    cyclePlayers();
  };

  return (
    <div
      style={{
        backgroundColor: "#022c22",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "550px",
          width: "100%",
          backgroundColor: "#064e3b",
          borderRadius: "24px",
          border: "4px solid #facc15",
          padding: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            margin: "0 0 5px",
            color: "#facc15",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Cartoon All-Stars 3D Cup 🏆
        </h2>

        <p
          style={{
            margin: "0 0 20px",
            fontSize: "13px",
            color: "#a7f3d0",
            textAlign: "center",
          }}
        >
          Cartoon Cricket Game • Space Or HIT Press
        </p>

        {/* SCOREBOARD */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px",
            backgroundColor: "#022c22",
            padding: "12px",
            borderRadius: "12px",
            marginBottom: "20px",
            textAlign: "center",
            border: "1px solid #047857",
          }}
        >
          <div>
            <div style={{ fontSize: "11px", color: "#a7f3d0" }}>
              SCORE / WICKETS
            </div>

            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#facc15",
              }}
            >
              {score} / {wickets}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "11px", color: "#a7f3d0" }}>
              HIGH SCORE
            </div>

            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {highScore}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "11px", color: "#a7f3d0" }}>
              STATUS
            </div>

            <div
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: wickets >= 3 ? "#ef4444" : "#4ade80",
                marginTop: "4px",
              }}
            >
              {wickets >= 3 ? "ALL OUT" : "🟢 PLAYING"}
            </div>
          </div>
        </div>

        {/* CRICKET PITCH */}

        <div
          style={{
            height: "340px",
            backgroundColor: "#10b981",
            borderRadius: "16px",
            position: "relative",
            overflow: "hidden",
            border: "3px solid #047857",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.3)",
          }}
        >
          {/* PITCH STRIP */}

          <div
            style={{
              position: "absolute",
              width: "70px",
              height: "100%",
              backgroundColor: "#eab308",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: 0.5,
              borderLeft: "2px dashed #fef08a",
              borderRight: "2px dashed #fef08a",
            }}
          />

          {/* BOWLER */}

          <div
            style={{
              position: "absolute",
              top: "15px",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <PlayerAvatar
              player={bowler}
              size={65}
              borderColor="#facc15"
            />

            <span
              style={{
                backgroundColor: "rgba(2,44,34,0.85)",
                padding: "3px 9px",
                borderRadius: "10px",
                fontSize: "11px",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              {bowler.name}
            </span>

            <small style={{ fontSize: "9px", color: "#fff" }}>
              {bowler.show}
            </small>
          </div>

          {/* FLYING BALL */}

          {isBallFlying && (
            <div
              style={{
                position: "absolute",
                fontSize: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                top: `${22 + ballProgress * 0.52}%`,
                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))",
                zIndex: 20,
              }}
            >
              🥎
            </div>
          )}

          {/* HIT ZONE */}

          <div
            style={{
              position: "absolute",
              bottom: "90px",
              width: "100%",
              height: "35px",
              backgroundColor: "rgba(250,204,21,0.25)",
              borderTop: "2px solid #facc15",
              borderBottom: "2px solid #facc15",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              color: "#fff",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            ⚡ HIT ZONE ⚡
          </div>

          {/* BATTER */}

          <div
            style={{
              position: "absolute",
              bottom: "15px",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "38px",
                position: "absolute",
                left: "-35px",
                bottom: "25px",
                transform: isBatSwinging
                  ? "rotate(-80deg)"
                  : "rotate(0deg)",
                transformOrigin: "bottom right",
                transition: "transform 0.08s ease-in-out",
              }}
            >
              🏏
            </div>

            <PlayerAvatar
              player={batter}
              size={75}
              borderColor="#4ade80"
            />

            <span
              style={{
                backgroundColor: "rgba(2,44,34,0.85)",
                padding: "3px 9px",
                borderRadius: "10px",
                fontSize: "11px",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              {batter.name}
            </span>

            <small style={{ fontSize: "9px", color: "#fff" }}>
              {batter.show}
            </small>
          </div>

          {/* UMPIRE SIGNAL */}

          {umpireSignal && (
            <div
              style={{
                position: "absolute",
                top: "45%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                backgroundColor: "rgba(2,44,34,0.95)",
                border: "2px solid #facc15",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                zIndex: 100,
                boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                whiteSpace: "nowrap",
              }}
            >
              {umpireSignal}
            </div>
          )}
        </div>

        {/* COMMENTARY */}

        <div
          style={{
            marginTop: "18px",
            backgroundColor: "#022c22",
            border: "1px solid #047857",
            borderRadius: "12px",
            padding: "12px",
            minHeight: "55px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontStyle: "italic",
              fontSize: "14px",
              color: "#fef08a",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            {commentary}
          </p>
        </div>

        {/* GAME CONTROLS */}

        {wickets < 3 ? (
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "18px",
            }}
          >
            <button
              onClick={deliverBall}
              disabled={isBallFlying}
              style={{
                flex: 1,
                padding: "14px 8px",
                backgroundColor: isBallFlying ? "#334155" : "#10b981",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: isBallFlying ? "not-allowed" : "pointer",
              }}
            >
              🥎 Bowl Delivery
            </button>

            <button
              onClick={swingBat}
              disabled={!isBallFlying}
              style={{
                flex: 1,
                padding: "14px 8px",
                backgroundColor: !isBallFlying ? "#334155" : "#eab308",
                color: "#0f172a",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: !isBallFlying ? "not-allowed" : "pointer",
              }}
            >
              🏏 HIT (Space)
            </button>
          </div>
        ) : (
          <button
            onClick={restartGame}
            style={{
              width: "100%",
              marginTop: "18px",
              padding: "15px",
              backgroundColor: "#facc15",
              color: "#022c22",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🔄 Match Over! Restart !
          </button>
        )}

        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: "#a7f3d0",
            marginTop: "15px",
            marginBottom: 0,
          }}
        >
          3 Wickets = Game Over • Press Space to Hit
        </p>
      </div>
    </div>
  );
};

export default DoodleCricket;
