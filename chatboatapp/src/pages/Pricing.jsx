import React from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    description: "For small projects and new ideas.",
    features: [
      "Project consultation",
      "Basic website planning",
      "Responsive design",
      "Standard support"
    ]
  },
  {
    name: "Business",
    description: "For growing businesses.",
    featured: true,
    features: [
      "Everything in Starter",
      "Advanced development",
      "Custom integrations",
      "Priority support"
    ]
  },
  {
    name: "Enterprise",
    description: "For advanced business requirements.",
    features: [
      "Custom architecture",
      "Scalable solutions",
      "Advanced security planning",
      "Dedicated project support"
    ]
  }
];

const Pricing = () => {

  return (

    <div className="inner-page">

      <section className="page-banner">

        <span className="eyebrow">FLEXIBLE PLANS</span>

        <h1>Cloudify Pricing</h1>

        <p>Choose the right starting point for your project.</p>

      </section>

      <section className="section">

        <div className="section-container pricing-grid">

          {plans.map((plan) => (

            <div
              className={`pricing-card ${plan.featured ? "featured" : ""}`}
              key={plan.name}
            >

              {plan.featured && (
                <span className="popular-label">POPULAR</span>
              )}

              <h2>{plan.name}</h2>

              <p>{plan.description}</p>

              <h3>Custom Quote</h3>

              <ul>

                {plan.features.map((feature) => (

                  <li key={feature}>
                    <span>✓</span> {feature}
                  </li>

                ))}

              </ul>

              <Link to="/login" className="primary-button">
                Discuss Your Project
              </Link>

            </div>

          ))}

        </div>

      </section>

    </div>

  );

};

export default Pricing;