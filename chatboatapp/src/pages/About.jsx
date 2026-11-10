import React from "react";
import { Link } from "react-router-dom";

const About = () => {

  return (

    <div className="inner-page">

      <section className="page-banner">

        <span className="eyebrow">ABOUT US</span>

        <h1>About Cloudify</h1>

        <p>Technology, creativity and innovation under one roof.</p>

      </section>

      <section className="section">

        <div className="section-container two-column">

          <div>

            <span className="eyebrow">OUR STORY</span>

            <h2>Technology That Moves Business Forward</h2>

            <p>
              Cloudify focuses on helping businesses use technology
              effectively through modern digital solutions.
            </p>

            <p>
              Our approach combines thoughtful planning, reliable
              development and continuous improvement.
            </p>

            <Link to="/services" className="primary-button">
              Explore Services →
            </Link>

          </div>

          <div className="about-image">

            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900"
              alt="Cloudify workspace"
            />

          </div>

        </div>

      </section>

      <section className="section dark-section">

        <div className="section-container simple-grid">

          <div className="info-card">
            <span className="large-icon">🎯</span>
            <h3>Our Mission</h3>
            <p>
              To deliver useful and reliable digital solutions
              that help businesses move forward.
            </p>
          </div>

          <div className="info-card">
            <span className="large-icon">🚀</span>
            <h3>Our Vision</h3>
            <p>
              To make modern technology more accessible,
              effective and valuable.
            </p>
          </div>

          <div className="info-card">
            <span className="large-icon">🤝</span>
            <h3>Our Values</h3>
            <p>
              Innovation, transparency, quality and
              customer-focused thinking.
            </p>
          </div>

        </div>

      </section>

      <section className="section">

        <div className="section-container section-heading">

          <span className="eyebrow">WHY CLOUDIFY</span>

          <h2>Our Approach</h2>

          <p>
            We believe every project deserves careful planning,
            clean development, meaningful communication and
            ongoing improvement.
          </p>

        </div>

      </section>

    </div>

  );

};

export default About;