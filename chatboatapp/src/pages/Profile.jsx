import React from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

const Profile = ({ user, handleLogout }) => {

  const navigate = useNavigate();

  const details = [
    ["User ID", user?.id],
    ["First Name", user?.firstName],
    ["Last Name", user?.lastName],
    ["Username", user?.username],
    ["Email", user?.email],
    ["Gender", user?.gender],
    ["Age", user?.age || "Not provided"],
    ["Phone", user?.phone || "Not provided"],
    ["Date Of Birth", user?.birthDate || "Not provided"],
    ["Blood Group", user?.bloodGroup || "Not provided"]
  ];

//   const handleLogout = () => {

//     localStorage.removeItem("cloudify_user");
//     localStorage.removeItem("cloudify_token");

//     navigate("/login", { replace: true });

//     window.location.reload();

//   };

  return (

    <div className="profile-page">

      <div className="profile-container">

        {/* PROFILE HEADING */}

        <div className="profile-heading">

          <div>

            <span className="eyebrow">
              MY ACCOUNT
            </span>

            <h1>My Profile</h1>

            <p>
              View your personal account information.
            </p>

          </div>

          <Link to="/dashboard" className="outline-button">
            ← Dashboard
          </Link>

        </div>

        {/* PROFILE CARD */}

        <div className="profile-card">

          <div className="profile-cover"></div>

          <div className="profile-main">

            <img
              src={user?.image}
              alt={`${user?.firstName} profile`}
              className="profile-avatar"
            />

            <h2>
              {user?.firstName} {user?.lastName}
            </h2>

            <p>@{user?.username}</p>

            <span className="account-status">
              ● Active Account
            </span>

          </div>

          {/* USER DETAILS */}

          <div className="profile-details">

            <div className="profile-section-title">
              <h3>Personal Information</h3>
            </div>

            {details.map(([label, value]) => (

              <div className="profile-detail" key={label}>

                <span>{label}</span>

                <strong>{value || "Not provided"}</strong>

              </div>

            ))}

          </div>

          {/* ADDRESS */}

          <div className="profile-details">

            <div className="profile-section-title">
              <h3>Address Information</h3>
            </div>

            <div className="profile-detail">
              <span>Address</span>
              <strong>{user?.address?.address || "Not provided"}</strong>
            </div>

            <div className="profile-detail">
              <span>City</span>
              <strong>{user?.address?.city || "Not provided"}</strong>
            </div>

            <div className="profile-detail">
              <span>State</span>
              <strong>{user?.address?.state || "Not provided"}</strong>
            </div>

            <div className="profile-detail">
              <span>Country</span>
              <strong>{user?.address?.country || "Not provided"}</strong>
            </div>

          </div>

          {/* COMPANY */}

          <div className="profile-details">

            <div className="profile-section-title">
              <h3>Company Information</h3>
            </div>

            <div className="profile-detail">
              <span>Company</span>
              <strong>{user?.company?.name || "Not provided"}</strong>
            </div>

            <div className="profile-detail">
              <span>Department</span>
              <strong>{user?.company?.department || "Not provided"}</strong>
            </div>

            <div className="profile-detail">
              <span>Job Title</span>
              <strong>{user?.company?.title || "Not provided"}</strong>
            </div>

          </div>

          <div className="profile-actions">

            <button
  className="danger-button"
  onClick={handleLogout}
>
  Logout
</button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Profile;