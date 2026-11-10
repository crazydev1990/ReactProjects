import React, { useState } from "react";

import {
  Link,
  Navigate,
  useNavigate
} from "react-router-dom";

const Login = ({ handleLogin, isLoggedIn }) => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  const submitLogin = async (event) => {

    event.preventDefault();

    setLoading(true);
    setError("");

    try {

      await handleLogin(username, password);

      navigate("/dashboard", { replace: true });

    } catch (error) {

      setError(error.message || "Login Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <Link to="/" className="login-brand">
          <span className="brand-icon">C</span>
          Cloudify.
        </Link>

        <span className="eyebrow">WELCOME BACK</span>

        <h1>Sign In</h1>

        <p className="login-description">
          Enter your credentials to access your Cloudify account.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={submitLogin}>

          <label htmlFor="username">
            Username
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
            required
          />

          <label htmlFor="password">
            Password
          </label>

          <div className="password-wrapper">

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

          <button
            type="submit"
            className="primary-button login-submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In →"}
          </button>

        </form>

        <div className="demo-credentials">

          <strong>Demo Credentials</strong>

          <p>Username: emilys</p>

          <p>Password: emilyspass</p>

        </div>

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>

      </div>

    </div>

  );

};

export default Login;