
import React, { useState, useEffect } from "react";

const EmojiPicker = () => {
  // States
  const [emojis, setEmojis] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState({
    emoji: "😀",
    name: "Grinning Face",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Emojis API
  const fetchLiveInternetEmojis = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://cdn.jsdelivr.net/npm/emojibase-data@17.0.0/en/data.json"
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid Emoji API response");
      }

      // Emoji Data Store
      setEmojis(data);

      console.log("Total Emojis:", data.length);

    } catch (error) {
      console.error("Emoji API Error:", error);
      setError(error.message || "Unable to load emojis");
    } finally {
      setLoading(false);
    }
  };

  // First Time API Call
  useEffect(() => {
    fetchLiveInternetEmojis();
  }, []);

  // Search Filter
  const filteredEmojis = emojis.filter((item) => {
    const searchText = searchQuery.toLowerCase();

    const emojiName = item.label || "";

    const emojiTags = (item.tags || []).join(" ");

    const emojiShortcodes = (item.shortcodes || []).join(" ");

    return (
      emojiName.toLowerCase().includes(searchText) ||
      emojiTags.toLowerCase().includes(searchText) ||
      emojiShortcodes.toLowerCase().includes(searchText)
    );
  });

  // Select Emoji
  const handleSelectEmoji = (item) => {
    setSelectedEmoji({
      emoji: item.emoji,
      name: item.label,
    });
  };

  // Copy Emoji
  const handleCopyEmoji = async () => {
    try {
      await navigator.clipboard.writeText(selectedEmoji.emoji);
      alert("Emoji Copied Successfully! " + selectedEmoji.emoji);
    } catch (error) {
      console.error("Copy Error:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "440px",
        width: "100%",
        backgroundColor: "#0f172a",
        border: "2px solid #38bdf8",
        padding: "25px",
        borderRadius: "20px",
        textAlign: "center",
        margin: "20px auto",
        boxSizing: "border-box",
        boxShadow: "0 20px 25px rgba(0,0,0,0.3)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Heading */}
      <h3 style={{ color: "#38bdf8", margin: "0 0 5px 0" }}>
        API Live Emoji Picker 🌐
      </h3>

      <p
        style={{
          margin: "0 0 25px 0",
          fontSize: "11px",
          color: "#64748b",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Synchronized with Global Emoji Repository
      </p>

      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search emoji... (smile, heart, cat, fire)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "25px",
            border: "1px solid #1e293b",
            backgroundColor: "#020617",
            color: "#fff",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Preview Screen */}
      <div
        style={{
          backgroundColor: "#020617",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #1e293b",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            minHeight: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? "🔄" : selectedEmoji.emoji}
        </div>

        <small
          style={{
            color: "#a78bfa",
            fontSize: "11px",
            display: "block",
            marginTop: "10px",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {loading ? "Syncing Server..." : selectedEmoji.name}
        </small>

        {!loading && (
          <button
            onClick={handleCopyEmoji}
            style={{
              marginTop: "12px",
              padding: "7px 15px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            📋 Copy Emoji
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <p style={{ color: "#64748b", fontSize: "12px" }}>
          🔄 Downloading Emojis...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <div
          style={{
            backgroundColor: "#450a0a",
            color: "#fca5a5",
            padding: "12px",
            borderRadius: "10px",
          }}
        >
          <p>❌ {error}</p>

          <button
            onClick={fetchLiveInternetEmojis}
            style={{
              padding: "8px 15px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Emoji Grid */}
      {!loading && !error && (
        <>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "12px",
              marginBottom: "10px",
            }}
          >
            Total Emojis Found: {filteredEmojis.length}
          </p>

          <div
            style={{
              height: "180px",
              overflowY: "auto",
              backgroundColor: "#020617",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #1e293b",
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: "10px",
            }}
          >
            {filteredEmojis.slice(0, 160).map((item) => (
              <button
                key={item.hexcode}
                title={item.label}
                onClick={() => handleSelectEmoji(item)}
                style={{
                  background:
                    selectedEmoji.emoji === item.emoji
                      ? "#334155"
                      : "none",
                  border:
                    selectedEmoji.emoji === item.emoji
                      ? "1px solid #38bdf8"
                      : "1px solid transparent",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: "2px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.emoji}
              </button>
            ))}

            {filteredEmojis.length === 0 && (
              <p
                style={{
                  gridColumn: "span 8",
                  color: "#64748b",
                  fontSize: "12px",
                }}
              >
                No Emojis Found 😕
              </p>
            )}
          </div>

          {filteredEmojis.length > 160 && (
            <p style={{ color: "#64748b", fontSize: "11px" }}>
              Showing first 160 emojis. Use Search to find more.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default EmojiPicker;
