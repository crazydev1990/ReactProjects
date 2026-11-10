import React, { useEffect, useState } from "react";
import CalenderWidget from "../components/CalenderWidget";
import ChartsWidget from "../components/ChartsWidget";

export default function Dashboard({ user, onLogin, onLogout }) {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://dummyjson.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password,
            expiresInMins: 30
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      onLogin(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // LOAD USERS
  useEffect(() => {
    if (!user) return;

    const loadUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/users?limit=100"
        );

        if (!response.ok) {
          throw new Error("Unable to load users");
        }

        const data = await response.json();

        setUsers(data.users || []);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [user]);

  // DELETE USER - FRONTEND ONLY
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setUsers((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  // SEARCH USERS
  const filteredUsers = users.filter((item) =>
    `${item.firstName} ${item.lastName} ${item.email} ${item.username}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // LOGIN PAGE
  if (!user) {
    return (
      <div className="login-page">
        <form className="login-card" onSubmit={handleLogin}>
          <div className="login-icon">🔐</div>

          <h2>Welcome Back</h2>
          <p>Login to your dashboard</p>

          {error && <div className="error-message">{error}</div>}

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="demo-credentials">
            <strong>Demo Credentials</strong>
            <span>Username: emilys</span>
            <span>Password: emilyspass</span>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">

      {/* LEFT SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          <span className="logo-icon">A</span>
          <h2>AdminPanel</h2>
        </div>

        <div className="sidebar-heading">
          MAIN MENU
        </div>

        <nav className="sidebar-menu">

          <button
            className={activeMenu === "dashboard" ? "active" : ""}
            onClick={() => setActiveMenu("dashboard")}
          >
            <span>▦</span> Dashboard
          </button>

          <button
            className={activeMenu === "users" ? "active" : ""}
            onClick={() => setActiveMenu("users")}
          >
            <span>♟</span> Users
          </button>

          <button
            className={activeMenu === "profile" ? "active" : ""}
            onClick={() => setActiveMenu("profile")}
          >
            <span>◉</span> My Profile
          </button>

          <button
            className={activeMenu === "settings" ? "active" : ""}
            onClick={() => setActiveMenu("settings")}
          >
            <span>⚙</span> Settings
          </button>

        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <img
              src={user.image}
              alt="Profile"
            />

            <div>
              <strong>{user.firstName}</strong>
              <small>{user.username}</small>
            </div>
          </div>

          <button className="logout-button" onClick={onLogout}>
            ⇥ Logout
          </button>
        </div>

      </aside>

      {/* RIGHT CONTENT */}
      <div className="main-area">

        {/* TOP HEADER */}
        <header className="top-header">
          <div>
            <h2>
              {activeMenu === "dashboard" && "Dashboard"}
              {activeMenu === "users" && "Users Management"}
              {activeMenu === "profile" && "My Profile"}
              {activeMenu === "settings" && "Settings"}
            </h2>

            <p>Welcome to your admin panel</p>
          </div>

          <div className="header-profile">
            <div className="notification">♧</div>

            <img src={user.image} alt="Profile" />

            <div>
              <strong>{user.firstName} {user.lastName}</strong>
              <small>{user.email}</small>
            </div>
          </div>
        </header>

        <main className="page-content">

          {error && (
            <div className="error-message">{error}</div>
          )}

          {/* DASHBOARD */}
          {activeMenu === "dashboard" && (
            <>
              <div className="welcome-section">
                <h1>Hello, {user.firstName}! 👋</h1>
                <p>Here is what's happening with your dashboard today.</p>
              </div>

              <div className="stats-grid">
                <ChartsWidget />
                <CalenderWidget />
                <div className="stat-card">
                  <div className="stat-icon blue">♟</div>
                  <div>
                    <span>Total Users</span>
                    <h2>{users.length}</h2>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon green">✓</div>
                  <div>
                    <span>Login Status</span>
                    <h2>Active</h2>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon orange">◉</div>
                  <div>
                    <span>Current User</span>
                    <h2>{user.username}</h2>
                  </div>
                </div>

              </div>

              <div className="content-card">
                <h3>Dashboard Overview</h3>
                <p>
                  You are successfully logged in using DummyJSON API.
                </p>

                <button
                  className="primary-button"
                  onClick={() => setActiveMenu("users")}
                >
                  View All Users
                </button>
              </div>
            </>
          )}

          {/* USERS */}
          {activeMenu === "users" && (
            <div className="content-card">

              <div className="section-header">
                <div>
                  <h3>All Users</h3>
                  <p>Manage users information</p>
                </div>

                <input
                  type="search"
                  className="search-input"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {loading ? (
                <p>Loading users...</p>
              ) : filteredUsers.length === 0 ? (
                <p className="empty-message">No users found.</p>
              ) : (
                <div className="table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredUsers.map((item) => (
                        <tr key={item.id}>
                          <td>#{item.id}</td>

                          <td>
                            <div className="table-user">
                              <img src={item.image} alt="" />
                              <span>
                                {item.firstName} {item.lastName}
                              </span>
                            </div>
                          </td>

                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.phone}</td>

                          <td>
                            <button
                              className="delete-button"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          )}

          {/* PROFILE */}
          {activeMenu === "profile" && (
            <div className="content-card profile-card">
              <img src={user.image} alt="Profile" />

              <h2>{user.firstName} {user.lastName}</h2>

              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Age:</strong> {user.age}</p>
            </div>
          )}

          {/* SETTINGS */}
          {activeMenu === "settings" && (
            <div className="content-card">
              <h3>Settings</h3>
              <p>Dashboard settings will be available here.</p>

              <button className="logout-button" onClick={onLogout}>
                Logout from Account
              </button>
            </div>
          )}

        </main>

        <footer className="footer">
          © 2026 AdminPanel. All rights reserved.
        </footer>

      </div>
    </div>
  );
}
