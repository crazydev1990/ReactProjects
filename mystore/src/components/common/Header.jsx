import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/Header.css';

const Header = (props) => {
  const { user, cart, onLogout } = props; // props નું ડેસ્ટ્રક્ચરિંગ

  const renderAuthButton = () => {
    if (user) {
      return <button onClick={onLogout} className="logout-btn">Logout</button>;
    } else {
      return <NavLink to="/login" className="nav-link">Login</NavLink>;
    }
  };

  let totalItems = 0;
  for (let i = 0; i < cart.length; i = i + 1) {
    totalItems = totalItems + cart[i].qty;
  }

  return (
    <header className="header">
      <div className="logo-container">
        <img 
          src={'../logo.png'} 
          alt="Meesho Logo" 
          style={{ width: '100px', height: '100px' }}
        />
      </div>
      
      {user && (
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "nav-link"}> Home</NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "active-link" : "nav-link"}>My Profile</NavLink>
          
          {/* 3D એનિમેટેડ કાર્ટ લિંક */}
          <NavLink to="/cart" className="cart-icon-wrapper">
            <svg className="cart-svg" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-count-badge">{totalItems}</span>
          </NavLink>
        </nav>
      )}
      <div>{renderAuthButton()}</div>
    </header>
  );
};

export default Header;
