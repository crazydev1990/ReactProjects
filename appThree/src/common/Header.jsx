// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
  // Helper function to dynamically add active text color when route matches
  const checkActive = ({ isActive }) => 
    isActive ? "nav-link px-3 text-warning fw-bold" : "nav-link px-3 text-white-50";

  return (
    <Navbar bg="dark" variant="dark" className="shadow-sm">
      <Container>
        {/* Main Logo using direct NavLink tag */}
        <NavLink to="/" className="navbar-brand fw-bold text-warning text-decoration-none">
          🏢 TechCorp HR Portal
        </NavLink>
        
        {/* Navigation Action Links using pure NavLink tags */}
        <Nav className="ms-auto fw-semibold">
          <NavLink to="/profile/E101" className={checkActive}>E101</NavLink>
          <NavLink to="/profile/E102" className={checkActive}>E102</NavLink>
          <NavLink to="/profile/E103" className={checkActive}>E103</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
