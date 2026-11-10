// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-auto border-top border-secondary">
      <Container>
        <Row className="gy-4">
          
          <Col lg={3} md={6}>
            <h5 className="text-warning mb-3">About Us</h5>
            <p className="text-secondary small lh-lg mb-0">
              We deliver enterprise core scaling systems and clean dynamic layouts for automated workplace tracking nodes.
            </p>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="text-warning mb-3">Quick Navigation</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a href="#home" className="text-secondary text-decoration-none small">Home</a></li>
              <li className="mb-2"><a href="#about" className="text-secondary text-decoration-none small">About System</a></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="text-warning mb-3">Compliance</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a href="#privacy" className="text-secondary text-decoration-none small">Privacy Rules</a></li>
              <li className="mb-2"><a href="#terms" className="text-secondary text-decoration-none small">Terms of Service</a></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="text-warning mb-3">Contact Support</h5>
            <p className="text-secondary small mb-1">📍 TechCorp HQ, Ahmedabad, India</p>
            <p className="text-secondary small mb-0">✉️ hr-support@techcorp.com</p>
          </Col>

        </Row>

        <hr className="border-secondary mt-4" />
        <Row>
          <Col className="text-center text-secondary small">
            <p className="mb-0">&copy; {new Date().getFullYear()} TechCorp. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;