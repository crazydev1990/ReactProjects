
import React, { useState, useEffect } from "react";

const DogApi = () => {
  // States
  const [dogImage, setDogImage] = useState("");
  const [dogBreed, setDogBreed] = useState("Unknown Breed");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Random Dog API
  const fetchRandomDog = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://dog.ceo/api/breeds/image/random"
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("Dog API Data:", data);

      if (data.status !== "success" || !data.message) {
        throw new Error("Dog image not found");
      }

      // Dog Image
      setDogImage(data.message);

      // Image URL માંથી Breed મેળવવી
      const imageUrl = data.message;
      const urlParts = imageUrl.split("/");

      const breedIndex = urlParts.indexOf("breeds");
      let breedName = "Unknown Breed";

      if (breedIndex !== -1 && urlParts[breedIndex + 1]) {
        breedName = urlParts[breedIndex + 1]
          .split("-")
          .reverse()
          .map((word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join(" ");
      }

      setDogBreed(breedName);

    } catch (error) {
      console.error("Dog API Error:", error);
      setError(error.message || "Unable to load dog image");
    } finally {
      setLoading(false);
    }
  };

  // First Time API Call
  useEffect(() => {
    fetchRandomDog();
  }, []);

  // Love Button
  const handleLove = () => {
    setLikes((prev) => prev + 1);
    fetchRandomDog();
  };

  // Skip Button
  const handleSkip = () => {
    setDislikes((prev) => prev + 1);
    fetchRandomDog();
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        width: "100%",
        backgroundColor: "#1e293b",
        borderRadius: "24px",
        border: "1px solid #334155",
        padding: "25px",
        textAlign: "center",
        boxSizing: "border-box",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        margin: "20px auto",
      }}
    >
      {/* Heading */}
      <h3 style={{ margin: "0 0 5px 0", color: "#38bdf8" }}>
        Canine Discovery Hub 🐶
      </h3>

      <p
        style={{
          margin: "0 0 20px 0",
          fontSize: "11px",
          color: "#64748b",
          fontWeight: "bold",
        }}
      >
        POWERED BY DOG CEO API
      </p>

      {/* Scoreboard */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#020617",
          padding: "12px",
          borderRadius: "14px",
          marginBottom: "20px",
        }}
      >
        <div>
          <div style={{ fontSize: "11px", color: "#94a3b8" }}>
            LOVED
          </div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#4ade80",
            }}
          >
            ❤️ {likes}
          </div>
        </div>

        <div>
          <div style={{ fontSize: "11px", color: "#94a3b8" }}>
            SKIPPED
          </div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#f87171",
            }}
          >
            💔 {dislikes}
          </div>
        </div>
      </div>

      {/* Dog Image Screen */}
      <div
        style={{
          height: "260px",
          backgroundColor: "#020617",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          border: "1px solid #334155",
        }}
      >
        {loading ? (
          <p style={{ color: "#64748b", fontSize: "13px" }}>
            🔄 Downloading Dog Profile...
          </p>
        ) : error ? (
          <div style={{ padding: "15px" }}>
            <p style={{ color: "#f87171", fontSize: "13px" }}>
              ❌ {error}
            </p>

            <button
              onClick={fetchRandomDog}
              style={{
                padding: "8px 15px",
                backgroundColor: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <img
              src={dogImage}
              alt="Random Dog"
              onError={() => {
                setError("Dog image could not be loaded.");
                setDogImage("");
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "12px",
                left: "12px",
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                border: "1px solid #38bdf8",
                color: "#38bdf8",
                fontWeight: "bold",
              }}
            >
              🏷️ {dogBreed}
            </div>
          </>
        )}
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handleSkip}
          disabled={loading}
          style={{
            flex: 1,
            padding: "12px",
            backgroundColor: "#334155",
            color: "#f87171",
            border: "1px solid #ef4444",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.5 : 1,
          }}
        >
          👎 Skip
        </button>

        <button
          onClick={handleLove}
          disabled={loading}
          style={{
            flex: 1,
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.5 : 1,
          }}
        >
          ❤️ Love It
        </button>
      </div>
    </div>
  );
};

export default DogApi;
