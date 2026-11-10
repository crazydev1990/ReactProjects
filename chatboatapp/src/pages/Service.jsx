import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: "💻",
    title: "Web Development",
    description: "Responsive websites, web applications and business platforms."
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    description: "Modern mobile application experiences for your users."
  },
  {
    icon: "🎨",
    title: "UI / UX Design",
    description: "Clean interfaces and intuitive user experiences."
  },
  {
    icon: "☁️",
    title: "Cloud Solutions",
    description: "Cloud infrastructure, deployment and scalable systems."
  },
  {
    icon: "🔐",
    title: "Cyber Security",
    description: "Security-focused development and digital protection."
  },
  {
    icon: "⚙️",
    title: "IT Consulting",
    description: "Technical guidance and architecture planning."
  }
];

const Service = () => {

  return (

    <div className="inner-page">

      <section className="page-banner">

        <span className="eyebrow">WHAT WE OFFER</span>

        <h1>Cloudify Services</h1>

        <p>Complete digital solutions for modern businesses.</p>

      </section>

      <section className="section">

        <div className="section-container">

          <div className="service-grid">

            {services.map((service) => (

              <div className="service-card light-card" key={service.title}>

                <span className="large-icon">{service.icon}</span>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <Link to="/login">Get Started →</Link>

              </div>

            ))}

          </div>

        </div>

      </section>

      <section className="section dark-section">

        <div className="section-container two-column">

          <div>
            <span className="eyebrow">OUR PROCESS</span>
            <h2>From Idea To Implementation</h2>
            <p>
              We understand your requirements, plan the solution,
              develop the product and improve it through feedback.
            </p>
          </div>

          <div className="simple-grid process-grid">

            <div className="info-card">
              <h3>01. Discover</h3>
              <p>Understand business needs.</p>
            </div>

            <div className="info-card">
              <h3>02. Plan</h3>
              <p>Prepare the right approach.</p>
            </div>

            <div className="info-card">
              <h3>03. Build</h3>
              <p>Develop the solution.</p>
            </div>

            <div className="info-card">
              <h3>04. Improve</h3>
              <p>Test and refine the product.</p>
            </div>

          </div>

        </div>

      </section>

    </div>

  );

};

export default Service;