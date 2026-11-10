import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3" sticky="bottom">
      <Container>
        <Row className="gy-4">
          <Col lg={3} md={6}>
            <h5 className="text-warning mb-3">About Us</h5>
            <p className="text-secondary small lh-lg">
              We are committed to delivering high-quality web services and digital solutions. Thank you for partnering with us.
            </p>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="text-warning mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#home" className="text-secondary text-decoration-none small">Home</a></li>
              <li className="mb-2"><a href="#about" className="text-secondary text-decoration-none small">About Us</a></li>
              <li className="mb-2"><a href="#services" className="text-secondary text-decoration-none small">Services</a></li>
              <li className="mb-2"><a href="#blog" className="text-secondary text-decoration-none small">Blog</a></li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="text-warning mb-3">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#help" className="text-secondary text-decoration-none small">Help Center</a></li>
              <li className="mb-2"><a href="#privacy" className="text-secondary text-decoration-none small">Privacy Policy</a></li>
              <li className="mb-2"><a href="#terms" className="text-secondary text-decoration-none small">Terms & Conditions</a></li>
              <li className="mb-2"><a href="#faq" className="text-secondary text-decoration-none small">FAQ</a></li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="text-warning mb-3">Contact Us</h5>
            <p className="text-secondary small mb-2">📍 Ahmedabad, Gujarat, India</p>
            <p className="text-secondary small mb-2">📞 +91 98765 43210</p>
            <p className="text-secondary small mb-2">✉️ info@example.com</p>
          </Col>
        </Row>
        <hr className="border-secondary mt-5" />
        <Row>
          <Col className="text-center text-secondary small">
            <p className="mb-0">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
