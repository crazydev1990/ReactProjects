
import React, { useEffect, useRef, useState } from "react";

const limit = (value) => Math.max(0, Math.min(100, value));

function StatusBar({ label, value, emoji }) {
  return (
    <div style={styles.statusItem}>
      <div style={styles.statusHeader}>
        <span>{emoji} {label}</span>
        <strong>{value}/100</strong>
      </div>

      <div style={styles.progressBackground}>
        <div
          style={{
            ...styles.progressFill,
            width: `${value}%`,
            background:
              value <= 20 ? "#ef4444" :
              value <= 45 ? "#f59e0b" :
              "#22c55e",
          }}
        />
      </div>
    </div>
  );
}

export default function VirtualPet() {
  const [petName, setPetName] = useState("Buddy");
  const [petType, setPetType] = useState("dog");
  const [petImage, setPetImage] = useState("");
  const [loadingImg, setLoadingImg] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [hunger, setHunger] = useState(70);
  const [happiness, setHappiness] = useState(70);
  const [energy, setEnergy] = useState(80);
  const [health, setHealth] = useState(100);
  const [coins, setCoins] = useState(100);

  const [isSleeping, setIsSleeping] = useState(false);
  const [activity, setActivity] = useState("તમારો પાલતુ રમવા તૈયાર છે!");

  const [foodEffect, setFoodEffect] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  const animationTimer = useRef(null);

  // Dog / Cat photo API
  const loadPetImage = async () => {
    setLoadingImg(true);
    setImageError(false);
    setPetImage("");

    try {
      const apiUrl =
        petType === "dog"
          ? "https://dog.ceo/api/breeds/image/random"
          : "https://api.thecatapi.com/v1/images/search";

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Image API request failed");
      }

      const data = await response.json();

      const imageUrl =
        petType === "dog" ? data.message : data[0]?.url;

      if (!imageUrl) {
        throw new Error("Image not found");
      }

      setPetImage(imageUrl);
    } catch (error) {
      console.error("Pet image error:", error);
      setImageError(true);
      setActivity("ફોટો લોડ થઈ શક્યો નથી. ફરી પ્રયાસ કરો.");
    } finally {
      setLoadingImg(false);
    }
  };

  useEffect(() => {
    loadPetImage();

    return () => {
      if (animationTimer.current) {
        clearTimeout(animationTimer.current);
      }
    };
  }, [petType]);

  // Sleep: દર 3 સેકન્ડે Energy +8 અને Hunger +2
  useEffect(() => {
    if (!isSleeping) return;

    const timer = setInterval(() => {
      setEnergy((previous) => limit(previous + 8));
      setHunger((previous) => limit(previous + 2));
      setActivity("💤 ઊંઘ દરમિયાન Energy વધી રહી છે...");
    }, 3000);

    return () => clearInterval(timer);
  }, [isSleeping]);

  // Visible animation on pet photo
  const showEffect = (type) => {
    if (animationTimer.current) {
      clearTimeout(animationTimer.current);
    }

    setFoodEffect(type);
    setAnimationKey((previous) => previous + 1);

    animationTimer.current = setTimeout(() => {
      setFoodEffect(null);
    }, 1800);
  };

  // Biscuit
  const feedBiscuit = () => {
    if (coins < 10) {
      setActivity("❌ Biscuit માટે 10 Coins જરૂરી છે.");
      return;
    }

    if (hunger === 0) {
      setActivity("તમારા Pet ને ભૂખ નથી!");
      return;
    }

    setCoins((previous) => previous - 10);
    setHunger((previous) => limit(previous - 15));
    setHappiness((previous) => limit(previous + 8));
    setHealth((previous) => limit(previous + 3));

    showEffect("biscuit");
    setActivity("🍪 તમારા Pet એ Biscuit ખાધું!");
  };

  // Chicken Feast
  const feedChicken = () => {
    if (coins < 25) {
      setActivity("❌ Chicken Feast માટે 25 Coins જરૂરી છે.");
      return;
    }

    if (hunger === 0) {
      setActivity("તમારા Pet ને ભૂખ નથી!");
      return;
    }

    setCoins((previous) => previous - 25);
    setHunger((previous) => limit(previous - 40));
    setHappiness((previous) => limit(previous + 8));
    setHealth((previous) => limit(previous + 3));

    showEffect("feast");
    setActivity("🍗 તમારા Pet એ Chicken Feast ખાધું!");
  };

  // Play
  const play = () => {
    if (isSleeping) {
      setActivity("પહેલા Pet ને જગાડો!");
      return;
    }

    if (energy < 15) {
      setActivity("Energy ઓછી છે. Pet ને Rest આપો.");
      return;
    }

    setHunger((previous) => limit(previous + 8));
    setHappiness((previous) => limit(previous + 15));
    setEnergy((previous) => limit(previous - 15));
    setCoins((previous) => previous + 10);

    showEffect("play");
    setActivity("⚽ Your pet is playing with you! +10 Coins");
  };

  // Cuddle
  const cuddle = () => {
    setHappiness((previous) => limit(previous + 10));

    showEffect("cuddle");
    setActivity("❤️ Your pet received love!");
  };

  // Rest
  const rest = () => {
    if (isSleeping) {
      setActivity("The pet is already sleeping.!");
      return;
    }

    setEnergy((previous) => limit(previous + 10));
    setHappiness((previous) => limit(previous + 3));

    showEffect("rest");
    setActivity("😴 The pet is resting.!");
  };

  // Care
  const care = () => {
    if (coins < 5) {
      setActivity("❌ 5 coins are required for Care.");
      return;
    }

    setCoins((previous) => previous - 5);
    setHealth((previous) => limit(previous + 15));
    setHappiness((previous) => limit(previous + 5));

    showEffect("care");
    setActivity("🩺 Your pet's health has improved.!");
  };

  // Sleep / Wake
  const toggleSleep = () => {
    if (!isSleeping) {
      setIsSleeping(true);
      showEffect("rest");
      setActivity("💤 Pet is sleeping...");
    } else {
      setIsSleeping(false);
      setActivity("☀️ Pet wake up!");
    }
  };

  const mood =
    health <= 20 ? "🤒 Sick" :
    hunger >= 80 ? "🍽️ Hungry" :
    energy <= 20 ? "😴 Tired" :
    happiness >= 75 ? "😃 Happy" :
    happiness <= 25 ? "😢 Sad" :
    "😊 Well";

  const effectContent = {
    biscuit: "🍪",
    feast: "🍗🥣",
    play: "⚽",
    cuddle: "❤️",
    rest: "💤",
    care: "💖",
  };

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes foodPop {
          0% {
            opacity: 0;
            transform: translate(-50%, 30px) scale(0.3);
          }
          35% {
            opacity: 1;
            transform: translate(-50%, -10px) scale(1.3);
          }
          65% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -35px) scale(0.7);
          }
        }

        @keyframes petBounce {
          0%, 100% { transform: translateY(0); }
          35% { transform: translateY(-12px); }
          70% { transform: translateY(3px); }
        }

        .pet-effect {
          position: absolute;
          left: 50%;
          bottom: 12%;
          font-size: 52px;
          z-index: 5;
          pointer-events: none;
          animation: foodPop 1.8s ease forwards;
          white-space: nowrap;
        }

        .pet-bounce {
          animation: petBounce 0.6s ease;
        }

        .pet-action-button {
          border: none;
          border-radius: 12px;
          padding: 13px 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          color: white;
          transition: transform 0.2s, opacity 0.2s;
        }

        .pet-action-button:hover {
          transform: translateY(-3px);
          opacity: 0.9;
        }

        .pet-action-button:active {
          transform: scale(0.96);
        }

        .pet-action-button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .pet-stats-grid {
            grid-template-columns: 1fr !important;
          }

          .pet-actions-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>

      <div style={styles.container}>
        <h1 style={styles.title}>🐾 Virtual Pet</h1>
        <p style={styles.subtitle}>
          Take care of your pet and play with it.!
        </p>

        {/* Coins */}
        <div style={styles.coins}>
          🪙 Coins: <strong>{coins}</strong>
        </div>

        {/* Pet name */}
        <div style={styles.nameSection}>
          <label style={styles.label}>Pet Name</label>
          <input
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Enter pet name"
            style={styles.input}
          />
        </div>

        {/* Pet selector */}
        <div style={styles.selector}>
          <button
            style={{
              ...styles.selectButton,
              background: petType === "dog" ? "#2563eb" : "#e5e7eb",
              color: petType === "dog" ? "#fff" : "#333",
            }}
            onClick={() => setPetType("dog")}
          >
            🐶 Dog
          </button>

          <button
            style={{
              ...styles.selectButton,
              background: petType === "cat" ? "#2563eb" : "#e5e7eb",
              color: petType === "cat" ? "#fff" : "#333",
            }}
            onClick={() => setPetType("cat")}
          >
            🐱 Cat
          </button>
        </div>

        {/* Pet image */}
        <div style={styles.petArea}>
          <div
            key={animationKey}
            className={foodEffect ? "pet-bounce" : ""}
            style={styles.petCircle}
          >
            {petImage && !imageError ? (
              <img
                src={petImage}
                alt={petName}
                style={styles.petImage}
                onError={() => setImageError(true)}
              />
            ) : (
              <div style={styles.fallback}>
                {petType === "dog" ? "🐶" : "🐱"}
              </div>
            )}

            {foodEffect && (
              <div className="pet-effect" key={animationKey}>
                {effectContent[foodEffect]}
              </div>
            )}

            {isSleeping && (
              <div style={styles.sleepBadge}>💤</div>
            )}
          </div>

          <h2 style={styles.petName}>{petName || "My Pet"}</h2>
          <div style={styles.mood}>{mood}</div>

          <button
            style={styles.photoButton}
            onClick={loadPetImage}
            disabled={loadingImg}
          >
            {loadingImg ? "Loading..." : "🔄 Change Photo"}
          </button>
        </div>

        {/* Activity message */}
        <div style={styles.activity}>
          {activity}
        </div>

        {/* Status meters */}
        <h3 style={styles.sectionTitle}>📊 Pet Status</h3>

        <div className="pet-stats-grid" style={styles.statsGrid}>
          <StatusBar label="Hunger" value={hunger} emoji="🍖" />
          <StatusBar label="Happiness" value={happiness} emoji="😊" />
          <StatusBar label="Energy" value={energy} emoji="⚡" />
          <StatusBar label="Health" value={health} emoji="❤️" />
        </div>

        {/* Food shop */}
        <h3 style={styles.sectionTitle}>🍽️ Food Shop</h3>

        <div className="pet-actions-grid" style={styles.actionsGrid}>
          <button
            className="pet-action-button"
            style={{ background: "#d97706" }}
            onClick={feedBiscuit}
            disabled={coins < 10}
          >
            🍪 Biscuit
            <br />
            <small>10 Coins</small>
          </button>

          <button
            className="pet-action-button"
            style={{ background: "#dc2626" }}
            onClick={feedChicken}
            disabled={coins < 25}
          >
            🍗 Chicken Feast
            <br />
            <small>25 Coins</small>
          </button>
        </div>

        {/* Activities */}
        <h3 style={styles.sectionTitle}>🎮 Activities</h3>

        <div className="pet-actions-grid" style={styles.actionsGrid}>
          <button
            className="pet-action-button"
            style={{ background: "#2563eb" }}
            onClick={play}
            disabled={isSleeping || energy < 15}
          >
            ⚽ Play
            <br />
            <small>Earn 10 Coins</small>
          </button>

          <button
            className="pet-action-button"
            style={{ background: "#ec4899" }}
            onClick={cuddle}
          >
            ❤️ Cuddle
          </button>

          <button
            className="pet-action-button"
            style={{ background: "#0891b2" }}
            onClick={rest}
            disabled={isSleeping}
          >
            😴 Rest
          </button>

          <button
            className="pet-action-button"
            style={{ background: "#16a34a" }}
            onClick={care}
            disabled={coins < 5}
          >
            🩺 Care
            <br />
            <small>5 Coins</small>
          </button>

          <button
            className="pet-action-button"
            style={{
              background: isSleeping ? "#64748b" : "#7c3aed",
              gridColumn: "1 / -1",
            }}
            onClick={toggleSleep}
          >
            {isSleeping ? "☀️ Wake Up" : "🌙 Sleep"}
          </button>
        </div>

        {/* Action rules */}
        <h3 style={styles.sectionTitle}>📋 Action Effects</h3>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Action", "Hunger", "Happiness", "Energy", "Health", "Coins"].map(
                  (heading) => (
                    <th key={heading} style={styles.th}>{heading}</th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {[
                ["Biscuit", "-15", "+8", "—", "+3", "-10"],
                ["Chicken Feast", "-40", "+8", "—", "+3", "-25"],
                ["Play", "+8", "+15", "-15", "—", "+10"],
                ["Cuddle", "—", "+10", "—", "—", "—"],
                ["Rest", "—", "+3", "+10", "—", "—"],
                ["Care", "—", "+5", "—", "+15", "-5"],
                ["Sleep (દર 3 સેકન્ડે)", "+2", "—", "+8", "—", "—"],
              ].map((item) => (
                <tr key={item[0]}>
                  {item.map((value, index) => (
                    <td key={index} style={styles.td}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={styles.note}>
          💡 Note: The cost for each meter will be between 0 and 100.If you run out of coins, you will not be able to make a purchase.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #dbeafe, #fce7f3)",
    padding: "30px 15px",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },
  container: {
    maxWidth: "750px",
    margin: "auto",
    background: "#fff",
    padding: "25px",
    borderRadius: "22px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
  },
  title: {
    textAlign: "center",
    color: "#1e3a8a",
    margin: "0 0 8px",
  },
  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "20px",
  },
  coins: {
    textAlign: "center",
    background: "#fef3c7",
    color: "#92400e",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "20px",
    fontSize: "18px",
  },
  nameSection: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "7px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    boxSizing: "border-box",
    fontSize: "15px",
  },
  selector: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    margin: "18px 0",
  },
  selectButton: {
    border: "none",
    borderRadius: "10px",
    padding: "11px 25px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  petArea: {
    textAlign: "center",
    margin: "20px 0",
  },
  petCircle: {
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    overflow: "hidden",
    position: "relative",
    margin: "auto",
    border: "7px solid #bfdbfe",
    background: "#eff6ff",
    boxShadow: "0 5px 20px rgba(37,99,235,0.2)",
  },
  petImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  fallback: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "100px",
  },
  sleepBadge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    fontSize: "30px",
    background: "rgba(255,255,255,0.85)",
    borderRadius: "50%",
    padding: "5px",
  },
  petName: {
    marginBottom: "5px",
    color: "#1e40af",
  },
  mood: {
    fontSize: "17px",
    marginBottom: "12px",
  },
  photoButton: {
    background: "#475569",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "9px 16px",
    cursor: "pointer",
  },
  activity: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    color: "#1e40af",
    textAlign: "center",
    borderRadius: "12px",
    padding: "14px",
    margin: "20px 0",
    fontWeight: "bold",
  },
  sectionTitle: {
    color: "#1e3a8a",
    marginTop: "25px",
    marginBottom: "14px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
  },
  statusItem: {
    background: "#f8fafc",
    padding: "13px",
    borderRadius: "12px",
  },
  statusHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "9px",
    fontSize: "14px",
  },
  progressBackground: {
    height: "12px",
    background: "#e2e8f0",
    borderRadius: "20px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: "20px",
    transition: "width 0.4s ease",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
    textAlign: "center",
  },
  th: {
    background: "#1e40af",
    color: "#fff",
    padding: "11px 7px",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "11px 7px",
    borderBottom: "1px solid #e2e8f0",
    whiteSpace: "nowrap",
  },
  note: {
    color: "#64748b",
    fontSize: "13px",
    lineHeight: 1.6,
    marginTop: "18px",
  },
};
