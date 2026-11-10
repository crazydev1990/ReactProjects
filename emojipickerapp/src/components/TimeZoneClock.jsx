
import React, { useEffect, useState } from "react";

const TimezoneClock = () => {
  const timezones = [
    { label: "India", value: "Asia/Kolkata" },
    { label: "USA - New York", value: "America/New_York" },
    { label: "USA - Los Angeles", value: "America/Los_Angeles" },
    { label: "UK - London", value: "Europe/London" },
    { label: "Japan - Tokyo", value: "Asia/Tokyo" },
    { label: "UAE - Dubai", value: "Asia/Dubai" },
    { label: "Australia - Sydney", value: "Australia/Sydney" },
    { label: "Canada - Toronto", value: "America/Toronto" },
    { label: "Singapore", value: "Asia/Singapore" },
    { label: "Germany - Berlin", value: "Europe/Berlin" },
    { label: "France - Paris", value: "Europe/Paris" },
    { label: "China - Shanghai", value: "Asia/Shanghai" },
    { label: "South Korea - Seoul", value: "Asia/Seoul" },
    { label: "Thailand - Bangkok", value: "Asia/Bangkok" },
  ];

  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Timezone dropdown change
  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  // Get selected timezone time parts
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(currentTime);

  const getPart = (type) =>
    Number(parts.find((item) => item.type === type)?.value || 0);

  const hour = getPart("hour");
  const minute = getPart("minute");
  const second = getPart("second");

  // Greeting based on selected timezone
  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning 🌅";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon ☀️";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening 🌆";
  } else {
    greeting = "Good Night 🌙";
  }

  // Digital clock
  const digitalTime = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(currentTime);

  // Selected timezone date
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    timeZone: timezone,
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(currentTime);

  // UTC offset
  const offset = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "longOffset",
  })
    .formatToParts(currentTime)
    .find((item) => item.type === "timeZoneName")?.value;

  // Analog clock rotation
  const hourRotation = (hour % 12) * 30 + minute * 0.5;
  const minuteRotation = minute * 6 + second * 0.1;
  const secondRotation = second * 6;

  const selectedTimezone = timezones.find(
    (item) => item.value === timezone
  );

  return (
    <div style={styles.container}>
      <h2>World Timezone Clock 🌍</h2>

      <div style={styles.selectBox}>
        <label>Select Country / Timezone</label>

        <select
          value={timezone}
          onChange={handleTimezoneChange}
          style={styles.select}
        >
          {timezones.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <h2 style={styles.greeting}>{greeting}</h2>

      <p style={styles.country}>
        {selectedTimezone?.label}
      </p>

      {/* Analog Clock */}
      <div style={styles.clock}>
        <span style={{ ...styles.number, top: "5px", left: "50%" }}>12</span>
        <span style={{ ...styles.number, right: "8px", top: "50%" }}>3</span>
        <span style={{ ...styles.number, bottom: "5px", left: "50%" }}>6</span>
        <span style={{ ...styles.number, left: "8px", top: "50%" }}>9</span>

        <div
          style={{
            ...styles.hand,
            height: "55px",
            transform: `translateX(-50%) rotate(${hourRotation}deg)`,
          }}
        />

        <div
          style={{
            ...styles.hand,
            height: "75px",
            width: "4px",
            transform: `translateX(-50%) rotate(${minuteRotation}deg)`,
          }}
        />

        <div
          style={{
            ...styles.hand,
            height: "85px",
            width: "2px",
            background: "#ef4444",
            transform: `translateX(-50%) rotate(${secondRotation}deg)`,
          }}
        />

        <div style={styles.centerDot} />
      </div>

      {/* Digital Clock */}
      <h1 style={styles.digitalTime}>
        {digitalTime}
      </h1>

      <p style={styles.date}>{formattedDate}</p>

      <p style={styles.offset}>
        Timezone: {timezone}
      </p>

      <p style={styles.offset}>
        UTC Offset: {offset}
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "450px",
    margin: "30px auto",
    padding: "25px",
    background: "#172033",
    color: "#fff",
    borderRadius: "15px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  selectBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    margin: "20px 0",
    textAlign: "left",
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    fontSize: "15px",
    cursor: "pointer",
  },
  greeting: {
    color: "#facc15",
    marginTop: "20px",
  },
  country: {
    color: "#cbd5e1",
  },
  clock: {
    width: "200px",
    height: "200px",
    border: "6px solid #94a3b8",
    borderRadius: "50%",
    margin: "25px auto",
    position: "relative",
    background: "#fff",
    color: "#111",
  },
  number: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    fontWeight: "bold",
  },
  hand: {
    position: "absolute",
    width: "6px",
    background: "#172033",
    bottom: "50%",
    left: "50%",
    transformOrigin: "bottom center",
    borderRadius: "10px",
  },
  centerDot: {
    position: "absolute",
    width: "12px",
    height: "12px",
    background: "#ef4444",
    borderRadius: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  digitalTime: {
    fontSize: "32px",
    margin: "15px 0",
    color: "#38bdf8",
  },
  date: {
    color: "#e2e8f0",
  },
  offset: {
    color: "#94a3b8",
    fontSize: "13px",
  },
};

export default TimezoneClock;
