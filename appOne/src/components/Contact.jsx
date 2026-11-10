import React from 'react'

const Contact = () => {
  return (
    <>
     <div className="w-100 bg-white">
      <section className="page-title-section bg-light py-5 text-start border-bottom">
        <div className="container">
          <h1 className="fw-bold text-dark mb-2 fs-2">Contact</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <a href="#home" className="text-success text-decoration-none">Home</a>
              </li>
              <li className="breadcrumb-item active text-muted" aria-current="page">Contact</li>
            </ol>
          </nav>
        </div>
      </section>
      <section id="contact-details" className="contact-section py-5 my-4">
        <div className="container">
          <div className="row g-4 text-start">
            <div className="col-lg-4" data-aos="fade-right">
              <div className="info-box-wrapper p-4 bg-white border rounded shadow-sm h-100">
                <h3 className="h4 fw-bold text-dark mb-3">Get in touch</h3>
                <p className="text-secondary small mb-4" style={{ lineHeight: '1.6' }}>
                  Et id eius voluptates atque nihil voluptatem enim in tempore minima sit ad mollitia commodi minus.
                </p>
                <div className="d-flex align-items-start mb-4">
                  <div className="icon-wrap bg-light text-success rounded p-2 me-3 fs-5 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div>
                    <h5 className="h6 fw-bold text-dark mb-1">Location:</h5>
                    <p className="text-muted small mb-0">A108 Adam Street, New York, NY 535022</p>
                  </div>
                </div>
                <div className="d-flex align-items-start mb-4">
                  <div className="icon-wrap bg-light text-success rounded p-2 me-3 fs-5 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div>
                    <h5 className="h6 fw-bold text-dark mb-1">Email:</h5>
                    <p className="text-muted small mb-0">info@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <div className="icon-wrap bg-light text-success rounded p-2 me-3 fs-5 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-phone"></i>
                  </div>
                  <div>
                    <h5 className="h6 fw-bold text-dark mb-1">Call:</h5>
                    <p className="text-muted small mb-0">+1 5589 55488 55</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8" data-aos="fade-left">
              <form className="contact-message-form bg-white p-4 border rounded shadow-sm h-100">
                <div className="row g-3">
                  <div className="col-md-6">
                    <input type="text" className="form-control border p-3 rounded small shadow-none" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" className="form-control border p-3 rounded small shadow-none" placeholder="Your Email" required />
                  </div>
                  <div className="col-12">
                    <input type="text" className="form-control border p-3 rounded small shadow-none" placeholder="Subject" required />
                  </div>
                  <div className="col-12">
                    <textarea className="form-control border p-3 rounded small shadow-none" rows="7" placeholder="Message" required></textarea>
                  </div>
                  <div className="col-12 text-center mt-3">
                    <button 
                      type="submit" 
                      className="btn text-white px-5 py-3 rounded-pill fw-semibold shadow-sm"
                      style={{ backgroundColor: '#28a745', border: 'none', fontSize: '15px' }}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
export default Contact
