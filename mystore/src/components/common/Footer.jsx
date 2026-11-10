import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../App.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      
      {/* ૧. મુખ્ય કન્ટેન્ટ ગ્રીડ એરિયા */}
      <div className="footer-grid">
        
        {/* કોલમ ૧: બ્રાન્ડ વિગત */}
        <div className="footer-col">
          <h4 style={{ color: '#f43397', fontSize: '20px' }}>Meesho Premium</h4>
          <p>India's largest and most popular reselling shopping platform. Now featuring a truly premium 3D and modern user experience.</p>
        </div>

        {/* કોલમ ૨: ક્વિક લિંક્સ */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><NavLink to="/">Shop Home</NavLink></li>
            <li><NavLink to="/profile">My Profile</NavLink></li>
            <li><NavLink to="/cart">Cart Box</NavLink></li>
          </ul>
        </div>

        {/* કોલમ ૩: સોશિયલ મીડિયા કનેક્ટ */}
        <div className="footer-col">
          <h4>Connect With Us</h4>
          <div className="social-icons-row">
            <div className="social-circle-icon">FB</div>
            <div className="social-circle-icon">TW</div>
            <div className="social-circle-icon">IG</div>
            <div className="social-circle-icon">LN</div>
          </div>
        </div>

      </div>

      {/* ૨. છેલ્લી કોપીરાઇટ પટ્ટી */}
      <div className="footer-bottom-bar">
        <p>© 2026 Meesho Premium Clone - Zero Ground Level Modular Practice Project</p>
      </div>

    </footer>
  );
};

export default Footer;
