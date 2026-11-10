import React from "react";

const reviews = [
  {
    quote: "A successful digital project starts with understanding the problem.",
    name: "Project Feedback",
    role: "Web Development"
  },
  {
    quote: "Good communication and thoughtful planning make a real difference.",
    name: "Project Feedback",
    role: "Technology Consulting"
  },
  {
    quote: "Reliable solutions are built through quality and continuous improvement.",
    name: "Project Feedback",
    role: "Digital Solutions"
  },
  {
    quote: "A good user experience makes technology easier to use.",
    name: "Project Feedback",
    role: "UI / UX Design"
  }
];

const Testimonial = () => {

  return (

    <div className="inner-page">

      <section className="page-banner">

        <span className="eyebrow">CLIENT EXPERIENCE</span>

        <h1>Testimonials & Reviews</h1>

        <p>Feedback and experiences from digital projects.</p>

      </section>

      <section className="section">

        <div className="section-container">

          <div className="testimonial-grid">

            {reviews.map((review, index) => (

              <div className="testimonial-card" key={index}>

                <div className="quote-mark">“</div>

                <p>{review.quote}</p>

                <h4>{review.name}</h4>

                <span>{review.role}</span>

              </div>

            ))}

          </div>

          <p className="sample-note">
            These are sample demonstration testimonials, not verified customer reviews.
          </p>

        </div>

      </section>

    </div>

  );

};

export default Testimonial;