import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {

  return (

    <footer className="site-footer">

      <div className="footer-container">

        <div className="footer-about">

          <Link to="/" className="footer-brand">
            <span className="brand-icon">C</span>
            Cloudify.
          </Link>

          <p>
            Building modern digital experiences with innovative
            technology, creative thinking and reliable solutions.
          </p>

          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">FB</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">IG</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">IN</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GH</a>
          </div>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/gallery">Gallery</Link>

        </div>

        <div className="footer-links">

          <h3>Explore</h3>

          <Link to="/team">Our Team</Link>
          <Link to="/testimonials">Reviews</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/login">Sign In</Link>

        </div>

        <div className="footer-contact">

          <h3>Contact Us</h3>

          <p>✉ support@cloudify.example</p>
          <p>⌖ Digital Solutions</p>
          <p>◷ Monday - Friday</p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>© 2026 Cloudify. All Rights Reserved.</p>

        <p>Privacy Policy | Terms & Conditions</p>

      </div>

    </footer>

  );

};

export default Footer;