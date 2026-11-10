
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Dashboard
      user={user}
      onLogin={handleLogin}
      onLogout={handleLogout}
    />
  );
}
