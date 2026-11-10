
import React, { useState, useEffect } from "react";

const WeatherApp = () => {
  // 1. Core States
  const [cityInput, setCityInput] = useState("Ahmedabad");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(
    "Initializing network weather station..."
  );
  const [error, setError] = useState("");

  // 2. Live Weather Fetch Function
  const fetchLiveGlobalWeather = async (e) => {
    if (e) e.preventDefault();

    const searchCity = cityInput.trim();

    if (!searchCity) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setStatusMessage(
      `Searching global server for "${searchCity}"...`
    );

    try {
      // STEP A: Geocoding API
      const geoURL = new URL(
        "https://geocoding-api.open-meteo.com/v1/search"
      );

      geoURL.search = new URLSearchParams({
        name: searchCity,
        count: "1",
        language: "en",
        format: "json",
      });

      const geoResponse = await fetch(geoURL);

      if (!geoResponse.ok) {
        throw new Error("Geocoding server connection failed.");
      }

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(
          `Location "${searchCity}" not found.`
        );
      }

      // Get location coordinates
      const {
        latitude,
        longitude,
        name,
        country,
        timezone: locationTimezone,
      } = geoData.results[0];

      setStatusMessage(
        `Coordinates found for ${name}, ${country}. Fetching weather...`
      );

      // STEP B: Weather Forecast API
      const weatherURL = new URL(
        "https://api.open-meteo.com/v1/forecast"
      );

      weatherURL.search = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current:
          "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        timezone: "auto",
      });

      const weatherResponse = await fetch(weatherURL);

      if (!weatherResponse.ok) {
        throw new Error("Weather server connection failed.");
      }

      const weatherResult = await weatherResponse.json();

      const current = weatherResult.current;

      if (!current) {
        throw new Error("Current weather data is unavailable.");
      }

      // STEP C: Weather condition mapping
      const code = current.weather_code;

      let conditionText = "Clear Sky";
      let conditionIcon = "☀️";

      if (code === 0) {
        conditionText = "Clear Sky";
        conditionIcon = "☀️";
      } else if (code >= 1 && code <= 3) {
        conditionText = "Partly Cloudy";
        conditionIcon = "⛅";
      } else if (code === 45 || code === 48) {
        conditionText = "Foggy Atmosphere";
        conditionIcon = "🌫️";
      } else if (code >= 51 && code <= 57) {
        conditionText = "Drizzle";
        conditionIcon = "🌦️";
      } else if (code >= 61 && code <= 67) {
        conditionText = "Rainy Weather";
        conditionIcon = "🌧️";
      } else if (code >= 71 && code <= 77) {
        conditionText = "Snowfall";
        conditionIcon = "❄️";
      } else if (code >= 80 && code <= 82) {
        conditionText = "Rain Showers";
        conditionIcon = "🌧️";
      } else if (code >= 85 && code <= 86) {
        conditionText = "Snow Showers";
        conditionIcon = "❄️";
      } else if (code >= 95 && code <= 99) {
        conditionText = "Thunderstorm";
        conditionIcon = "⛈️";
      }

      // STEP D: Store live API data
      setWeatherData({
        cityName: `${name}, ${country}`,
        temp: `${current.temperature_2m}°C`,
        feelsLike: `${current.apparent_temperature}°C`,
        humidity: `${current.relative_humidity_2m}%`,
        wind: `${current.wind_speed_10m} km/h`,
        condition: conditionText,
        icon: conditionIcon,
        timezone: locationTimezone || weatherResult.timezone,
        updatedAt: current.time,
      });

      setStatusMessage(
        `Live weather successfully synced for ${name}, ${country}.`
      );

    } catch (err) {
      console.error("Weather API Error:", err);

      setError(
        `❌ ${err.message || "Unable to fetch weather data."}`
      );

      setWeatherData(null);

      setStatusMessage("Weather data synchronization failed.");

    } finally {
      setLoading(false);
    }
  };

  // 3. Initial API Call
  useEffect(() => {
    fetchLiveGlobalWeather();
  }, []);

  return (
    <div
      style={{
        maxWidth: "440px",
        width: "100%",
        backgroundColor: "#0f172a",
        border: "2px solid #10b981",
        padding: "25px",
        borderRadius: "20px",
        textAlign: "center",
        margin: "0 auto",
        boxSizing: "border-box",
        boxShadow: "0 20px 25px rgba(0,0,0,0.3)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3 style={{ color: "#10b981", margin: "0 0 5px 0" }}>
        Live Weather Station 🌤️
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
        100% Live API Weather Data
      </p>

      {/* Search Form */}
      <form
        onSubmit={fetchLiveGlobalWeather}
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter city name..."
          disabled={loading}
          style={{
            flexGrow: 1,
            minWidth: 0,
            padding: "11px 15px",
            borderRadius: "8px",
            border: "1px solid #1e293b",
            backgroundColor: "#020617",
            color: "#fff",
            fontSize: "14px",
            outline: "none",
          }}
        />

        <button
          type="submit"
          disabled={loading || !cityInput.trim()}
          style={{
            padding: "11px 18px",
            backgroundColor: "#10b981",
            color: "#020617",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "13px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Loading..." : "Search 🚀"}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p
          style={{
            color: "#ef4444",
            fontSize: "12.5px",
            margin: "0 0 15px 0",
            backgroundColor: "rgba(239,68,68,0.05)",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          {error}
        </p>
      )}

      {/* Weather Display */}
      <div
        style={{
          backgroundColor: "#020617",
          padding: "25px 15px",
          borderRadius: "16px",
          border: "1px solid #1e293b",
          minHeight: "220px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {loading ? (
          <div
            style={{
              color: "#10b981",
              fontStyle: "italic",
              fontSize: "14px",
            }}
          >
            Locating global weather database...
          </div>
        ) : weatherData ? (
          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#64748b",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Logged Location
            </span>

            <div
              style={{
                fontSize: "17px",
                color: "#fff",
                fontWeight: "bold",
                marginTop: "4px",
                marginBottom: "15px",
              }}
            >
              📍 {weatherData.cityName}
            </div>

            <div
              style={{
                fontSize: "56px",
                marginBottom: "5px",
                lineHeight: 1,
              }}
            >
              {weatherData.icon}
            </div>

            <div
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                color: "#fff",
                letterSpacing: "0.5px",
              }}
            >
              {weatherData.temp}
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#10b981",
                fontWeight: "bold",
                marginTop: "6px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {weatherData.condition}
            </div>

            {/* Weather Details */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
                marginTop: "20px",
                borderTop: "1px solid #1e293b",
                paddingTop: "15px",
                fontSize: "13px",
                color: "#cbd5e1",
                textAlign: "left",
              }}
            >
              <div>
                🌡️ <b>Feels Like:</b> {weatherData.feelsLike}
              </div>

              <div>
                💧 <b>Humidity:</b> {weatherData.humidity}
              </div>

              <div style={{ gridColumn: "span 2" }}>
                💨 <b>Wind Velocity:</b> {weatherData.wind}
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid #1e293b",
                marginTop: "15px",
                paddingTop: "12px",
                color: "#64748b",
                fontSize: "11px",
                textAlign: "left",
              }}
            >
              🌍 Timezone: {weatherData.timezone}
              <br />
              🕒 API Updated: {weatherData.updatedAt}
            </div>
          </div>
        ) : (
          <div style={{ color: "#64748b", fontSize: "14px" }}>
            No weather data available.
          </div>
        )}
      </div>

      {/* Status */}
      <small
        style={{
          color: "#475569",
          fontStyle: "italic",
          display: "block",
          marginTop: "12px",
          fontSize: "11px",
          textAlign: "left",
          paddingLeft: "4px",
        }}
      >
        Trace: {statusMessage}
      </small>
    </div>
  );
};

export default WeatherApp;
