import React from 'react'

const Service = () => {
  return (
    <>
    <div className="w-100 bg-white">
      <section className="page-title-section bg-light py-5 text-start border-bottom">
        <div className="container">
          <h1 className="fw-bold text-dark mb-2 fs-2">Services</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <a href="#home" className="text-success text-decoration-none">Home</a>
              </li>
              <li className="breadcrumb-item active text-muted" aria-current="page">Services</li>
            </ol>
          </nav>
        </div>
      </section>
      <section id="our-services" className="services-section py-5 my-4">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-5 text-start" data-aos="fade-right">
              <span className="text-uppercase text-muted small fw-bold tracking-wider d-block mb-2">
                Our Services
              </span>
              <h2 className="h4 fw-bold text-dark mb-4" style={{ color: '#1a2530', lineHeight: '1.4' }}>
                Far far away, behind the word mountains, far from the countries Vokalia
              </h2>
              <p className="text-secondary small mb-4" style={{ lineHeight: '1.7' }}>
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
              </p>
              <p className="text-muted small mb-5" style={{ lineHeight: '1.7' }}>
                Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
              </p>
              <div className="btn-wrapper">
                <a 
                  href="#get-started" 
                  className="btn text-white px-4 py-2 rounded-pill fw-semibold shadow-sm" 
                  style={{ backgroundColor: '#28a745', border: 'none', fontSize: '14px' }}
                >
                  Get Started
                </a>
              </div>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <div className="row g-4 row-cols-1 row-cols-sm-2 text-start ps-lg-4">
                <div className="col mb-2">
                  <div className="icon-wrap mb-3 text-success fs-2">
                    <i className="bi bi-search"></i>
                  </div>
                  <h4 className="h6 fw-bold text-dark mb-2">Square</h4>
                  <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
                    Separated they live in Bookmarksgrove right at the coast
                  </p>
                </div>
                <div className="col mb-2">
                  <div className="icon-wrap mb-3 text-success fs-2">
                    <i className="bi bi-command"></i>
                  </div>
                  <h4 className="h6 fw-bold text-dark mb-2">Technology</h4>
                  <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
                    Separated they live in Bookmarksgrove right at the coast
                  </p>
                </div>
                <div className="col mb-2">
                  <div className="icon-wrap mb-3 text-success fs-2">
                    <i className="bi bi-grid-3x3-gap"></i>
                  </div>
                  <h4 className="h6 fw-bold text-dark mb-2">Brilliant Ideas</h4>
                  <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
                    Separated they live in Bookmarksgrove right at the coast
                  </p>
                </div>
                <div className="col mb-2">
                  <div className="icon-wrap mb-3 text-success fs-2">
                    <i className="bi bi-globe"></i>
                  </div>
                  <h4 className="h6 fw-bold text-dark mb-2">Blueprint</h4>
                  <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
                    Separated they live in Bookmarksgrove right at the coast
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
export default Service
