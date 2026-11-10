import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    tag: "CLOUD TECHNOLOGY",
    title: "Build Your Future With Cloudify",
    description: "Powerful cloud solutions and modern technology to transform your business.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600",
    button: "Explore Services",
    link: "/services"
  },
  {
    tag: "WEB DEVELOPMENT",
    title: "Digital Experiences That Matter",
    description: "We create modern, responsive and scalable digital experiences.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600",
    button: "About Cloudify",
    link: "/about"
  },
  {
    tag: "INNOVATION & SECURITY",
    title: "Technology You Can Trust",
    description: "Secure, reliable and innovative solutions for growing businesses.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600",
    button: "View Pricing",
    link: "/pricing"
  }
];

const services = [
  ["01", "Web Development", "Modern and scalable websites for your business."],
  ["02", "Mobile Applications", "Powerful applications for mobile platforms."],
  ["03", "UI / UX Design", "Beautiful and user-friendly digital interfaces."],
  ["04", "Cloud Solutions", "Reliable cloud infrastructure and deployment."],
  ["05", "Cyber Security", "Security-focused solutions for digital assets."],
  ["06", "IT Consulting", "Technology guidance for business growth."]
];

const Home = () => {

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);

  }, []);

  const slide = slides[activeSlide];

  return (

    <div className="home-page">

      {/* HERO SLIDER */}

      <section
        className="hero-section"
        style={{ backgroundImage: `url(${slide.image})` }}
      >

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <span className="eyebrow">{slide.tag}</span>

          <h1>{slide.title}</h1>

          <p>{slide.description}</p>

          <Link to={slide.link} className="primary-button">
            {slide.button} →
          </Link>

          <div className="slider-dots">

            {slides.map((item, index) => (

              <button
                key={item.title}
                className={activeSlide === index ? "active" : ""}
                onClick={() => setActiveSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />

            ))}

          </div>

        </div>

      </section>

      {/* ABOUT */}

      <section className="section" id="about">

        <div className="section-container two-column">

          <div>

            <span className="eyebrow">WHO WE ARE</span>

            <h2>We Make Technology Work For Your Business</h2>

            <p>
              Cloudify focuses on building modern digital solutions
              that help businesses improve, grow and innovate.
            </p>

            <p>
              From web applications to cloud infrastructure, we combine
              creativity and technology to deliver meaningful results.
            </p>

            <Link to="/about" className="text-link">
              Discover Cloudify →
            </Link>

          </div>

          <div className="about-image">

            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900"
              alt="Team working together"
            />

          </div>

        </div>

      </section>

      {/* SERVICES */}

      <section className="section dark-section" id="services">

        <div className="section-container">

          <div className="section-heading">

            <span className="eyebrow">WHAT WE DO</span>

            <h2>Our Services</h2>

            <p>Technology solutions designed around your business.</p>

          </div>

          <div className="service-grid">

            {services.map(([number, title, description]) => (

              <div className="service-card" key={number}>

                <span className="service-number">{number}</span>

                <h3>{title}</h3>

                <p>{description}</p>

                <Link to="/services">Learn More →</Link>

              </div>

            ))}

          </div>

          <div className="center-action">
            <Link to="/services" className="outline-button">
              View All Services
            </Link>
          </div>

        </div>

      </section>

      {/* GALLERY */}

      <section className="section" id="gallery">

        <div className="section-container">

          <div className="section-heading">

            <span className="eyebrow">OUR WORK</span>

            <h2>Project Gallery</h2>

            <p>A glimpse into our technology and creative world.</p>

          </div>

          <div className="gallery-grid">

            {[
              ["photo-1498050108023-c5249f4df085", "Web Development"],
              ["photo-1519389950473-47ba0277781c", "Team Collaboration"],
              ["photo-1553877522-43269d4ea984", "Business Strategy"]
            ].map(([image, title]) => (

              <div className="gallery-card" key={image}>

                <img
                  src={`https://images.unsplash.com/${image}?w=800`}
                  alt={title}
                />

                <div className="gallery-caption">{title}</div>

              </div>

            ))}

          </div>

          <div className="center-action">
            <Link to="/gallery" className="outline-button">
              View Full Gallery
            </Link>
          </div>

        </div>

      </section>

      {/* TEAM */}

      <section className="section dark-section" id="team">

        <div className="section-container">

          <div className="section-heading">

            <span className="eyebrow">OUR PEOPLE</span>

            <h2>Meet Our Team</h2>

            <p>Creative minds working together to build better technology.</p>

          </div>

          <div className="simple-grid">

            {[
              ["Strategy & Planning", "Business analysis and technical planning."],
              ["Development Team", "Building reliable applications and platforms."],
              ["Customer Success", "Support and customer collaboration."]
            ].map(([title, description]) => (

              <div className="info-card" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>

            ))}

          </div>

          <div className="center-action">
            <Link to="/team" className="outline-button">
              Meet The Team
            </Link>
          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}

      <section className="section" id="testimonials">

        <div className="section-container">

          <div className="section-heading">

            <span className="eyebrow">CLIENT FEEDBACK</span>

            <h2>What People Say</h2>

          </div>

          <div className="testimonial-card">

            <div className="quote-mark">“</div>

            <p>
              Great digital experiences start with clear communication,
              thoughtful design and reliable technology.
            </p>

            <h4>Cloudify Client Experience</h4>

            <span>Sample testimonial content</span>

          </div>

          <div className="center-action">
            <Link to="/testimonials" className="text-link">
              Read More Reviews →
            </Link>
          </div>

        </div>

      </section>

      {/* PRICING */}

      <section className="section dark-section" id="pricing">

        <div className="section-container">

          <div className="section-heading">

            <span className="eyebrow">OUR PLANS</span>

            <h2>Simple Pricing</h2>

            <p>Choose a starting point for your next digital project.</p>

          </div>

          <div className="pricing-grid">

            {[
              ["Starter", "For small projects"],
              ["Business", "For growing businesses"],
              ["Enterprise", "For advanced requirements"]
            ].map(([name, description]) => (

              <div className="pricing-card" key={name}>

                <h3>{name}</h3>

                <p>{description}</p>

                <h2>Custom Quote</h2>

                <Link to="/pricing" className="outline-button">
                  View Plan
                </Link>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="cta-section">

        <div className="section-container">

          <h2>Ready to Build Something Great?</h2>

          <p>Let's discuss your next digital project.</p>

          <Link to="/services" className="primary-button">
            Get Started →
          </Link>

        </div>

      </section>
      
{/* CONTACT SECTION */}

<section className="contact-section" id="contact">

  <div className="container">

    <div className="section-heading">
      <span className="section-tag">GET IN TOUCH</span>
      <h2>Let's Talk About Your Project</h2>
      <p>
        Have a project in mind? Contact us and let's
        build something amazing together.
      </p>
    </div>

    <div className="contact-grid">

      {/* CONTACT INFORMATION */}

      <div className="contact-info">

        <h3>Contact Information</h3>

        <p>
          We'd love to hear from you. Reach out to us
          using the details below.
        </p>

        <div className="contact-item">
          <span>📍</span>
          <div>
            <h4>Our Location</h4>
            <p>Ahmedabad, Gujarat, India</p>
          </div>
        </div>

        <div className="contact-item">
          <span>📧</span>
          <div>
            <h4>Email Address</h4>
            <p>hello@cloudify.example</p>
          </div>
        </div>

        <div className="contact-item">
          <span>📞</span>
          <div>
            <h4>Phone Number</h4>
            <p>+91 XXXXX XXXXX</p>
          </div>
        </div>

        <div className="contact-item">
          <span>🕒</span>
          <div>
            <h4>Working Hours</h4>
            <p>Monday - Friday: 9 AM - 6 PM</p>
          </div>
        </div>

      </div>

      {/* CONTACT FORM */}

      <div className="contact-form-wrapper">

        <h3>Send Us a Message</h3>

        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you! Your message form is ready for API integration.");
            e.target.reset();
          }}
        >

          <div className="form-row">

            <input
              type="text"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              required
            />

          </div>

          <input
            type="tel"
            placeholder="Your Phone Number"
            required
          />

          <input
            type="text"
            placeholder="Subject"
            required
          />

          <textarea
            placeholder="Write your message..."
            rows="5"
            required
          />

          <button type="submit">
            Send Message →
          </button>

        </form>

      </div>

    </div>

    {/* GOOGLE MAP */}

    <div className="contact-map">

      <iframe
        title="Cloudify Location Map"
        src="https://www.google.com/maps?q=Ahmedabad,Gujarat,India&output=embed"
        width="100%"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

    </div>

  </div>

</section>


    </div>

  );

};

export default Home;