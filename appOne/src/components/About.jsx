import React from 'react'

const About = () => {
  return (
    <>
    <div className="w-100 bg-white">
      <section className="page-title-section bg-light py-5 text-start border-bottom">
        <div className="container">
          <h1 className="fw-bold text-dark mb-2 fs-2">About</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <a href="#home" className="text-success text-decoration-none">Home</a>
              </li>
              <li className="breadcrumb-item active text-muted" aria-current="page">About</li>
            </ol>
          </nav>
        </div>
      </section>
      <section id="our-mission" className="mission-section py-5 my-4">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6 text-start" data-aos="fade-right">
              <span className="text-uppercase text-muted small fw-bold tracking-wider d-block mb-2">
                Our Mission
              </span>
              <h2 className="h3 fw-bold text-dark mb-4" style={{ color: '#1a2530', lineHeight: '1.4' }}>
                The Big Oxmox advised her not to do so, because there were thousands.
              </h2>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.7' }}>
                A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country.
              </p>
              <p className="text-muted small mb-5" style={{ lineHeight: '1.7' }}>
                The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli.
              </p>
              <div className="btn-wrapper">
                <a 
                  href="#get-started" 
                  className="btn text-white px-4 py-2 rounded-pill fw-semibold shadow-sm" 
                  style={{ backgroundColor: '#28a745', border: 'none', fontSize: '15px' }}
                >
                  Get Started
                </a>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="image-container ps-lg-4 text-center">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/img_v_3.jpg" 
                  alt="Artistic Abstract Visual" 
                  className="img-fluid rounded" 
                  style={{ maxHeight: '450px', width: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div className="w-100 bg-white py-5">
      <section className="features-grid-section mb-5 pb-4">
        <div className="container">
          <div className="row g-4 text-center text-sm-start">
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-item-box pe-lg-4">
                <div className="icon-wrap d-inline-flex align-items-center justify-content-center bg-light rounded-circle p-3 mb-3" style={{ width: '60px', height: '60px' }}>
                  {/* અહીં ઈમેજ સ્ક્રીનશોટ મુજબના લીલા કલરના આઈકન વર્તુળ આવશે */}
                  <i className="bi bi-bullseye text-success fs-3"></i>
                </div>
                <h4 className="h5 fw-bold text-dark mb-2">Technology</h4>
                <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
                  Separated they live in Bookmarksgrove right at the coast
                </p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-item-box pe-lg-4">
                <div className="icon-wrap d-inline-flex align-items-center justify-content-center bg-light rounded-circle p-3 mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-command text-success fs-3"></i>
                </div>
                <h4 className="h5 fw-bold text-dark mb-2">Web Design</h4>
                <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
                  Separated they live in Bookmarksgrove right at the coast
                </p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-item-box pe-lg-4">
                <div className="icon-wrap d-inline-flex align-items-center justify-content-center bg-light rounded-circle p-3 mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-bar-chart-line text-success fs-3"></i>
                </div>
                <h4 className="h5 fw-bold text-dark mb-2">Branding</h4>
                <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
                  Separated they live in Bookmarksgrove right at the coast
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="why-us" className="why-us-section pt-4 mt-5">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="image-wrapper pe-lg-4">
                <img 
                  src="https://bootstrapmade.com/content/demo/Active/assets/img/img_v_1.jpg" 
                  alt="Why Us Collaborative Visual" 
                  className="img-fluid rounded" 
                  style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="col-lg-6 text-start" data-aos="fade-left">
              <span className="text-uppercase text-muted small fw-bold tracking-wider d-block mb-2">
                Why Us
              </span>
              <h3 className="h3 fw-bold text-dark mb-4" style={{ color: '#1a2530', lineHeight: '1.4' }}>
                Far far away Behind the Word Mountains
              </h3>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.7', fontSize: '15px' }}>
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.
              </p>
              <p className="text-muted small mb-0" style={{ lineHeight: '1.7' }}>
                There live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
export default About
