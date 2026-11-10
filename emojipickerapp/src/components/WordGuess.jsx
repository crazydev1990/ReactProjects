
import React, { useState, useEffect } from "react";

const WordGuess = () => {
  // States
  const [secretWord, setSecretWord] = useState("");
  const [revealedIndices, setRevealedIndices] = useState([]);
  const [userGuessInput, setUserInput] = useState("");
  const [maxAllowedHints, setMaxHints] = useState(0);
  const [statusText, setStatusText] = useState(
    "Connecting to dictionary server..."
  );
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // API માંથી Random Secret Word મેળવવો
  const fetchLiveSecretWord = async () => {
    setLoading(true);
    setGameWon(false);
    setVerifying(false);
    setRevealedIndices([]);
    setUserInput("");
    setSecretWord("");
    setStatusText("Downloading dictionary words...");

    try {
      // 3 થી 6 અક્ષરના શબ્દો મેળવવા
      const requests = [3, 4, 5, 6].map((length) =>
        fetch(
          `https://api.datamuse.com/words?sp=${"?".repeat(length)}&max=1000`
        )
      );

      const responses = await Promise.all(requests);

      // API Response Check
      for (const response of responses) {
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
      }

      const results = await Promise.all(
        responses.map((response) => response.json())
      );

      // બધા શબ્દોને એક જ લિસ્ટમાં લાવવા
      const allWords = results.flat();

      // Valid Words Filter
      const validWords = [
        ...new Set(
          allWords
            .map((item) => item.word.toUpperCase())
            .filter(
              (word) =>
                word.length >= 3 &&
                word.length <= 6 &&
                /^[A-Z]+$/.test(word)
            )
        ),
      ];

      if (validWords.length === 0) {
        throw new Error("No valid words found");
      }

      // Random Word Select
      const freshWord =
        validWords[Math.floor(Math.random() * validWords.length)];

      setSecretWord(freshWord);

      // Maximum Hints
      const allowedHintsCount = freshWord.length - 2;
      setMaxHints(allowedHintsCount);

      setStatusText(
        `New word loaded! Click boxes to reveal up to ${allowedHintsCount} letters.`
      );

    } catch (error) {
      console.error("Word API Error:", error);

      // Backup Word
      setSecretWord("CODE");
      setMaxHints(2);

      setStatusText(
        '⚠️ API connection failed. Backup word "CODE" loaded.'
      );

    } finally {
      setLoading(false);
    }
  };

  // First Time Load
  useEffect(() => {
    fetchLiveSecretWord();
  }, []);

  // Hint Click Handler
  const handleSlotMouseClick = (index) => {
    if (loading || verifying || gameWon) return;

    if (revealedIndices.includes(index)) return;

    if (revealedIndices.length >= maxAllowedHints) {
      setStatusText(
        `⚠️ Hint Limit Reached! Maximum ${maxAllowedHints} hints allowed.`
      );
      return;
    }

    const updatedIndices = [...revealedIndices, index];

    setRevealedIndices(updatedIndices);

    setStatusText(
      `Letter revealed! ${
        maxAllowedHints - updatedIndices.length
      } hint clicks remaining.`
    );
  };

  // Win Handler
  const triggerWinState = () => {
    setGameWon(true);

    setRevealedIndices(
      secretWord.split("").map((_, index) => index)
    );

    setStatusText(
      "🏆 EXCELLENT! Your word is valid and meaningful! You Win!"
    );
  };

  // Dictionary Word Verification
  const handleGuessVerification = async (e) => {
    e.preventDefault();

    if (gameWon || loading || verifying || !userGuessInput.trim()) {
      return;
    }

    const formattedGuess = userGuessInput.trim().toUpperCase();

    // Length Validation
    if (formattedGuess.length !== secretWord.length) {
      setStatusText(
        `⚠️ Please enter exactly ${secretWord.length} letters.`
      );
      return;
    }

    // Hint Validation
    for (let i = 0; i < secretWord.length; i++) {
      if (
        revealedIndices.includes(i) &&
        formattedGuess[i] !== secretWord[i]
      ) {
        setStatusText(
          `⚠️ Hint Conflict! Position ${i + 1} must be "${secretWord[i]}".`
        );
        return;
      }
    }

    // Exact Secret Word
    if (formattedGuess === secretWord) {
      triggerWinState();
      return;
    }

    // Dictionary Verification
    setVerifying(true);

    setStatusText(
      "🔍 Verifying your word in the global dictionary..."
    );

    try {
      const checkResponse = await fetch(
        `https://api.datamuse.com/words?sp=${encodeURIComponent(
          formattedGuess.toLowerCase()
        )}&max=100`
      );

      if (!checkResponse.ok) {
        throw new Error(`API Error: ${checkResponse.status}`);
      }

      const checkData = await checkResponse.json();

      // Exact Spelling Check
      const isValidWord = checkData.some(
        (item) =>
          item.word.toUpperCase() === formattedGuess
      );

      if (isValidWord) {
        triggerWinState();
      } else {
        setStatusText(
          `❌ INVALID WORD! "${formattedGuess}" is not recognized. Try again!`
        );
      }

    } catch (error) {
      console.error("Verification Error:", error);

      setStatusText(
        "❌ Dictionary server unavailable. Please try again."
      );

    } finally {
      setVerifying(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "440px",
        width: "100%",
        backgroundColor: "#0f172a",
        border: "2px solid #eab308",
        padding: "25px",
        borderRadius: "20px",
        textAlign: "center",
        margin: "0 auto",
        boxSizing: "border-box",
        boxShadow: "0 20px 25px rgba(0,0,0,0.3)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Heading */}
      <h3 style={{ color: "#eab308", margin: "0 0 5px 0" }}>
        API Live Word Guess 📝
      </h3>

      <p
        style={{
          margin: "0 0 20px 0",
          fontSize: "11px",
          color: "#64748b",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Synchronized with Datamuse Dictionary
      </p>

      {/* Game Rules */}
      <div
        style={{
          backgroundColor: "#020617",
          padding: "10px 15px",
          borderRadius: "10px",
          border: "1px solid #1e293b",
          fontSize: "12px",
          color: "#94a3b8",
          marginBottom: "20px",
          textAlign: "left",
          lineHeight: "1.5",
        }}
      >
        💡 <b>Smart Validation Engine:</b> Guess the exact
        secret word OR any meaningful English word with
        the same length that matches all revealed letters.
      </div>

      {/* Word Boxes */}
      <div
        style={{
          backgroundColor: "#020617",
          padding: "20px 10px",
          borderRadius: "14px",
          border: "1px solid #1e293b",
          marginBottom: "25px",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {loading ? (
          <span
            style={{
              color: "#475569",
              fontSize: "14px",
              fontStyle: "italic",
            }}
          >
            Generating dynamic slots...
          </span>
        ) : (
          secretWord.split("").map((letter, index) => {
            const isRevealed = revealedIndices.includes(index);

            return (
              <div
                key={index}
                onClick={() => handleSlotMouseClick(index)}
                style={{
                  width: "42px",
                  height: "44px",
                  backgroundColor: isRevealed
                    ? "rgba(234,179,8,0.1)"
                    : "#1e293b",
                  border: isRevealed
                    ? "2px solid #eab308"
                    : "1px solid #334155",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: isRevealed ? "#fff" : "#475569",
                  cursor:
                    isRevealed || gameWon
                      ? "default"
                      : "pointer",
                  userSelect: "none",
                  transition: "all 0.15s",
                }}
              >
                {isRevealed ? letter : "?"}
              </div>
            );
          })
        )}
      </div>

      {/* Status Message */}
      <p
        style={{
          margin: "0 0 25px 0",
          fontSize: "13.5px",
          color: gameWon ? "#4ade80" : "#cbd5e1",
          fontStyle: "italic",
          minHeight: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: "1.4",
        }}
      >
        {statusText}
      </p>

      {/* Guess Form */}
      <form
        onSubmit={handleGuessVerification}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          backgroundColor: "#020617",
          padding: "15px",
          borderRadius: "12px",
          border: "1px solid #1e293b",
          boxSizing: "border-box",
        }}
      >
        <small
          style={{
            color: "#64748b",
            display: "block",
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "10px",
            textTransform: "uppercase",
          }}
        >
          Type your full word guess below:
        </small>

        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={userGuessInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={loading || gameWon || verifying}
            placeholder={
              loading ? "Waiting for server..." : "Type secret word..."
            }
            style={{
              flexGrow: 1,
              minWidth: 0,
              padding: "11px 15px",
              borderRadius: "6px",
              border: "1px solid #334155",
              backgroundColor: "#0f172a",
              color: "#fff",
              fontSize: "14px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            disabled={
              loading ||
              gameWon ||
              verifying ||
              !userGuessInput.trim()
            }
            style={{
              padding: "11px 20px",
              backgroundColor: gameWon ? "#334155" : "#eab308",
              color: "#020617",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "13px",
              cursor: "pointer",
              opacity: verifying ? 0.6 : 1,
            }}
          >
            {verifying ? "Checking..." : "Verify 🚀"}
          </button>
        </div>
      </form>

      {/* Next Word Button */}
      <button
        onClick={fetchLiveSecretWord}
        disabled={loading || verifying}
        style={{
          width: "100%",
          padding: "13px",
          backgroundColor: "#334155",
          color: "#fff",
          border: "1px solid #475569",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
          marginTop: "18px",
          opacity: loading ? 0.5 : 1,
        }}
      >
        🔄 Fetch Next Internet Word
      </button>
    </div>
  );
};

export default WordGuess;
