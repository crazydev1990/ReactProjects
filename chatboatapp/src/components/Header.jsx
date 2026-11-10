import React, { useState } from "react";

import {
  NavLink,
  Link,
  useNavigate
} from "react-router-dom";

const Header = ({ user, handleLogout }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const logout = () => {

    handleLogout();

    closeMenu();

    navigate("/login", { replace: true });

  };

  const navClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (

    <header className="site-header">

      <div className="header-container">

        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
        >
          <span className="brand-icon">C</span>
          Cloudify<span className="brand-dot">.</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`navigation ${menuOpen ? "show" : ""}`}>

          <NavLink to="/" end className={navClass} onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/about" className={navClass} onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/services" className={navClass} onClick={closeMenu}>
            Services
          </NavLink>

          <NavLink to="/gallery" className={navClass} onClick={closeMenu}>
            Gallery
          </NavLink>

          <NavLink to="/team" className={navClass} onClick={closeMenu}>
            Team
          </NavLink>

          <NavLink to="/testimonials" className={navClass} onClick={closeMenu}>
            Reviews
          </NavLink>

          <NavLink to="/pricing" className={navClass} onClick={closeMenu}>
            Pricing
          </NavLink>
        
        <NavLink to="/#contact" className="nav-link">
           Contact
        </NavLink>
        
          {user ? (

            <>

              <NavLink
                to="/dashboard"
                className={navClass}
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/profile"
                className={navClass}
                onClick={closeMenu}
              >
                Profile
              </NavLink>

              <button
                className="nav-login-button"
                onClick={logout}
              >
                Logout
              </button>

            </>

          ) : (

            <Link
              to="/login"
              className="nav-login-button"
              onClick={closeMenu}
            >
              Sign In
            </Link>

          )}

        </nav>

      </div>

    </header>

  );

};

export default Header;