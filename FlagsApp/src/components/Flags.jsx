
import React, { useState, useEffect } from "react";

const Flags = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load Countries API
  const loadWorldFlags = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/mledoze/countries/master/countries.json"
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid countries data");
      }

      // Countries ને નામ પ્રમાણે Sort કરવા
      const sortedCountries = data.sort((a, b) =>
        (a.name?.common || "").localeCompare(b.name?.common || "")
      );

      setCountries(sortedCountries);

      console.log("Countries Loaded:", sortedCountries);

    } catch (error) {
      console.error("Country API Error:", error);
      setError(error.message || "Unable to load countries");
    } finally {
      setLoading(false);
    }
  };

  // Page Load
  useEffect(() => {
    loadWorldFlags();
  }, []);

  // Search and Region Filter
  const filteredList = countries.filter((country) => {
    const countryName = country.name?.common || "";

    const nameMatch = countryName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const regionMatch =
      selectedRegion === "All" ||
      country.region === selectedRegion;

    return nameMatch && regionMatch;
  });

  return (
    <div
      style={{
        backgroundColor: "#020617",
        minHeight: "100vh",
        color: "#fff",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Heading */}
        <h2>🗺️ Country Flag Hub</h2>

        <p style={{ color: "#64748b", fontSize: "12px" }}>
          Search Country with Regions Filter
        </p>

        {/* Search and Filter */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            margin: "20px 0",
            flexWrap: "wrap",
          }}
        >
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by country name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "10px 15px",
              borderRadius: "6px",
              border: "1px solid #334155",
              backgroundColor: "#0f172a",
              color: "#fff",
              width: "250px",
              outline: "none",
            }}
          />

          {/* Region Dropdown */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #334155",
              backgroundColor: "#0f172a",
              color: "#fff",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="All">🌍 All Regions</option>
            <option value="Asia">🌏 Asia</option>
            <option value="Africa">🌍 Africa</option>
            <option value="Europe">🇪🇺 Europe</option>
            <option value="Americas">🌎 Americas</option>
            <option value="Oceania">🌊 Oceania</option>
          </select>

          {/* Reload Button */}
          <button
            onClick={loadWorldFlags}
            disabled={loading}
            style={{
              padding: "10px 15px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#0284c7",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              opacity: loading ? 0.6 : 1,
            }}
          >
            🔄 Reload
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p style={{ color: "#38bdf8" }}>
            🔄 Loading countries from API...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            style={{
              backgroundColor: "#450a0a",
              color: "#fca5a5",
              padding: "15px",
              borderRadius: "8px",
              margin: "20px 0",
            }}
          >
            <p>❌ {error}</p>

            <button
              onClick={loadWorldFlags}
              style={{
                padding: "8px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Countries */}
        {!loading && !error && (
          <>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                marginBottom: "20px",
              }}
            >
              Total Countries: {filteredList.length}
            </p>

            {/* Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "15px",
              }}
            >
              {filteredList.map((country) => (
                <div
                  key={country.cca3}
                  style={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #1e293b",
                    padding: "12px",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: "140px",
                  }}
                >
                  {/* Flag */}
                  <div
                    style={{
                      width: "100%",
                      height: "85px",
                      borderRadius: "6px",
                      overflow: "hidden",
                      backgroundColor: "#1e293b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {country.flags?.png || country.flags?.svg ? (
                      <img
                        src={
                          country.flags?.png ||
                          country.flags?.svg
                        }
                        alt={`${country.name?.common} Flag`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: "30px" }}>
                        {country.flag || "🏳️"}
                      </span>
                    )}
                  </div>

                  {/* Country Name */}
                  <div style={{ marginTop: "12px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        display: "block",
                      }}
                    >
                      {country.name?.common}
                    </span>

                    <small
                      style={{
                        color: "#38bdf8",
                        fontSize: "11px",
                      }}
                    >
                      📍 {country.region || "Unknown"}
                    </small>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredList.length === 0 && (
              <p
                style={{
                  color: "#94a3b8",
                  marginTop: "40px",
                }}
              >
                😕 No countries found!
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Flags;
