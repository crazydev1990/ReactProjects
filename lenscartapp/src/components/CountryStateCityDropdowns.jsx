
import React, { useState, useEffect } from "react";

const API_BASE = "https://countriesnow.space/api/v0.1";

async function apiRequest(url, options = {}) {
  const response = await fetch(url, options);
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`API Error: HTTP ${response.status}`);
  }

  if (!contentType.includes("application/json")) {
    throw new Error(
      "API returned HTML instead of JSON. Check the API endpoint."
    );
  }

  let result;

  try {
    result = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON response from API.");
  }

  if (result.error) {
    throw new Error(result.msg || "API request failed.");
  }

  return result;
}

function CountryStateCityDropdowns() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [error, setError] = useState("");

  // 1. Fetch Countries
  useEffect(() => {
    const controller = new AbortController();

    async function fetchCountries() {
      setLoadingCountries(true);
      setError("");

      try {
        const result = await apiRequest(
          `${API_BASE}/countries/iso`,
          { signal: controller.signal }
        );

        setCountries(
          Array.isArray(result.data) ? result.data : []
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Countries API Error:", err);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingCountries(false);
        }
      }
    }

    fetchCountries();

    return () => controller.abort();
  }, []);

  // 2. Fetch States when Country changes
  useEffect(() => {
    setStates([]);
    setCities([]);
    setSelectedState("");
    setSelectedCity("");

    if (!selectedCountry) return;

    const controller = new AbortController();

    async function fetchStates() {
      setLoadingStates(true);
      setError("");

      try {
        const result = await apiRequest(
          `${API_BASE}/countries/states`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              country: selectedCountry
            }),
            signal: controller.signal
          }
        );

        const stateList = result.data?.states;

        setStates(Array.isArray(stateList) ? stateList : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("States API Error:", err);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingStates(false);
        }
      }
    }

    fetchStates();

    return () => controller.abort();
  }, [selectedCountry]);

  // 3. Fetch Cities when Country or State changes
  useEffect(() => {
    setCities([]);
    setSelectedCity("");

    if (!selectedCountry || !selectedState) return;

    const controller = new AbortController();

    async function fetchCities() {
      setLoadingCities(true);
      setError("");

      try {
        const result = await apiRequest(
          `${API_BASE}/countries/state/cities`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              country: selectedCountry,
              state: selectedState
            }),
            signal: controller.signal
          }
        );

        setCities(
          Array.isArray(result.data) ? result.data : []
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Cities API Error:", err);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingCities(false);
        }
      }
    }

    fetchCities();

    return () => controller.abort();
  }, [selectedCountry, selectedState]);

  const selectStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#020617",
    color: "#fff",
    fontSize: "14px",
    marginTop: "6px",
    outline: "none"
  };

  const labelStyle = {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "bold"
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "30px auto",
        padding: "25px",
        backgroundColor: "#0f172a",
        borderRadius: "20px",
        border: "2px solid #38bdf8",
        color: "#fff",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h3
        style={{
          color: "#38bdf8",
          margin: "0 0 5px",
          textAlign: "center"
        }}
      >
        Country - State - City 🌍
      </h3>

      <p
        style={{
          margin: "0 0 20px",
          fontSize: "11px",
          color: "#64748b",
          textAlign: "center",
          fontWeight: "bold"
        }}
      >
        Live API • Dependent Dropdowns
      </p>

      {/* COUNTRY */}
      <div style={{ marginBottom: "15px" }}>
        <label style={labelStyle}>
          1. SELECT COUNTRY:
        </label>

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          disabled={loadingCountries}
          style={selectStyle}
        >
          <option value="">
            {loadingCountries
              ? "Loading Countries..."
              : "-- Choose Country --"}
          </option>

          {countries.map((item) => (
            <option key={item.Iso2 || item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* STATE */}
      <div style={{ marginBottom: "15px" }}>
        <label style={labelStyle}>
          2. SELECT STATE: {loadingStates && "(Loading...)"}
        </label>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry || loadingStates}
          style={{
            ...selectStyle,
            opacity: !selectedCountry ? 0.5 : 1
          }}
        >
          <option value="">-- Choose State --</option>

          {states.map((state, index) => (
            <option
              key={state.name || index}
              value={state.name}
            >
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* CITY */}
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>
          3. SELECT CITY: {loadingCities && "(Loading...)"}
        </label>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState || loadingCities}
          style={{
            ...selectStyle,
            opacity: !selectedState ? 0.5 : 1
          }}
        >
          <option value="">-- Choose City --</option>

          {cities.map((city, index) => (
            <option key={`${city}-${index}`} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* ERROR */}
      {error && (
        <div
          role="alert"
          style={{
            padding: "12px",
            backgroundColor: "#3b202b",
            borderRadius: "8px",
            color: "#ff9999",
            fontSize: "13px",
            marginBottom: "15px",
            overflowWrap: "anywhere"
          }}
        >
          {error}
        </div>
      )}

      {/* FINAL OUTPUT */}
      {selectedCity && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#020617",
            borderRadius: "10px",
            border: "1px solid #22c55e",
            color: "#4ade80",
            fontSize: "13px",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          📍 Selected: {selectedCity}, {selectedState},{" "}
          {selectedCountry}
        </div>
      )}
    </div>
  );
}

export default CountryStateCityDropdowns;
