import React from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

const Dashboard = ({ user, handleLogout }) => {

  const navigate = useNavigate();

  const stats = [
    {
      icon: "📁",
      title: "Total Projects",
      value: "12",
      description: "Your workspace"
    },
    {
      icon: "⏳",
      title: "Active Tasks",
      value: "08",
      description: "Currently in progress"
    },
    {
      icon: "✅",
      title: "Completed",
      value: "24",
      description: "Successfully completed"
    },
    {
      icon: "🟢",
      title: "Account Status",
      value: "Active",
      description: "Your account is active"
    }
  ];

//   const handleLogout = () => {

//     localStorage.removeItem("cloudify_user");
//     localStorage.removeItem("cloudify_token");

//     navigate("/login", { replace: true });

//     window.location.reload();

//   };

  return (

    <div className="dashboard-page">

      <div className="dashboard-container">

        {/* DASHBOARD HEADER */}

        <div className="dashboard-heading">

          <div>

            <span className="eyebrow">
              CLOUDIFY WORKSPACE
            </span>

            <h1>
              Welcome, {user?.firstName || user?.username}!
            </h1>

            <p>
              Here is your account overview.
            </p>

          </div>

          <button
  className="danger-button"
  onClick={handleLogout}
>
  Logout
</button>

        </div>

        {/* STATISTICS */}

        <div className="dashboard-stats">

          {stats.map((stat) => (

            <div className="stat-card" key={stat.title}>

              <div className="stat-top">
                <span>{stat.icon}</span>
                <p>{stat.title}</p>
              </div>

              <h2>{stat.value}</h2>

              <small>{stat.description}</small>

            </div>

          ))}

        </div>

        {/* DASHBOARD CONTENT */}

        <div className="dashboard-content-grid">

          <div className="dashboard-panel">

            <h2>Account Information</h2>

            <div className="dashboard-user">

              <img
                src={user?.image}
                alt="User profile"
              />

              <div>

                <h3>
                  {user?.firstName} {user?.lastName}
                </h3>

                <p>{user?.email}</p>

                <span>@{user?.username}</span>

              </div>

            </div>

            <Link to="/profile" className="primary-button">
              View Full Profile →
            </Link>

          </div>

          <div className="dashboard-panel">

            <h2>Quick Actions</h2>

            <div className="quick-actions">

              <Link to="/profile">
                👤 My Profile
              </Link>

              <Link to="/services">
                🛠 Explore Services
              </Link>

              <Link to="/pricing">
                💳 View Pricing
              </Link>

              <Link to="/">
                🏠 Back to Home
              </Link>

            </div>

          </div>

        </div>

        {/* RECENT ACTIVITY */}

        <div className="dashboard-panel recent-activity">

          <h2>Recent Activity</h2>

          <div className="activity-item">
            <span className="activity-dot"></span>
            <div>
              <strong>Account Login</strong>
              <p>You successfully logged into Cloudify.</p>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-dot"></span>
            <div>
              <strong>Profile Access</strong>
              <p>Your profile is available in your workspace.</p>
            </div>
          </div>

        </div>

        <div className="dashboard-note">

          <strong>Demo Dashboard</strong>

          <p>
            Project and task numbers are sample display data.
            They are not fetched from a live project management system.
          </p>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;