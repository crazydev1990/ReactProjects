import React from 'react'
import style from './Common/Home.module.css'

const Home = () => {
  return (
    <>

    <section id="hero" className="hero section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="hero-content">
              <h1>Transform Your <span>Digital Future</span></h1>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.</p>
              <div className="hero-actions justify-content-center justify-content-lg-start">
                <a href="#services" className="btn btn-primary scrollto">Start Journey</a>
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox btn-video d-flex align-items-center">
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-image">
              <img src="https://bootstrapmade.com/content/demo/Devin/assets/img/illustration/illustration-28.webp" className="img-fluid floating" alt=""/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="about" className="about section py-5">
      <div className="container" data-aos="fade-up">
        <div className="row align-items-center gy-5">
          <div className="col-lg-6" data-aos="fade-right" data-aos-delay="200">
            <div className="image-wrapper position-relative">
              <img 
                src="https://bootstrapmade.com/content/demo/Devin/assets/img/about/about-portrait-4.webp" 
                alt="Devin Team Collaboration" 
                className="img-fluid rounded shadow-sm" 
              />
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="300">
            <div className="content ps-lg-4">
              <h2 className="display-5 fw-bold text-dark mb-4">Innovation and Dedication</h2>
              <p className="lead text-muted mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-secondary mb-5">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <div className="row g-4 mb-5 text-center text-sm-start">
                <div className="col-sm-4">
                  <div className="stat-box">
                    <span className="d-block display-4 fw-bold text-primary">150+</span>
                    <span className="text-uppercase text-muted small fw-semibold tracking-wider">Projects Completed</span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="stat-box">
                    <span className="d-block display-4 fw-bold text-primary">12+</span>
                    <span className="text-uppercase text-muted small fw-semibold tracking-wider">Years Experience</span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="stat-box">
                    <span className="d-block display-4 fw-bold text-primary">98%</span>
                    <span className="text-uppercase text-muted small fw-semibold tracking-wider">Client Satisfaction</span>
                  </div>
                </div>
              </div>
              <div className="btn-wrapper">
                <a href="#story" className="btn btn-outline-primary px-4 py-2 rounded">
                  Discover Our Story <i className="bi bi-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="services" className="services section py-5 bg-light">
      <div className="container" data-aos="fade-up">
        <div className="section-title text-center mb-5">
          <h2 className="display-5 fw-bold text-dark position-relative d-inline-block pb-3">
            Services
            <span 
              className="position-absolute bottom-0 start-50 translate-middle-x bg-primary" 
              style={{ width: '50px', height: '3px' }}
            ></span>
          </h2>
          <p className="text-muted mt-3">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
          </p>
        </div>
        <div className="row g-4">
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="service-card p-5 bg-white border rounded shadow-sm h-100 text-start">
              <div className="icon-box d-inline-flex align-items-center justify-content-center bg-primary-subtle rounded-circle p-3 mb-4 text-primary fs-3" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-palette"></i>
              </div>
              <h3 className="h5 fw-bold text-dark mb-3">Creative Design</h3>
              <p className="text-secondary small mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <a href="#" className="text-primary fw-semibold text-decoration-none small d-inline-flex align-items-center">
                Learn More <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="service-card p-5 bg-white border rounded shadow-sm h-100 text-start">
              <div className="icon-box d-inline-flex align-items-center justify-content-center bg-primary-subtle rounded-circle p-3 mb-4 text-primary fs-3" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-code-slash"></i>
              </div>
              <h3 className="h5 fw-bold text-dark mb-3">Web Development</h3>
              <p className="text-secondary small mb-4">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
              </p>
              <a href="#" className="text-primary fw-semibold text-decoration-none small d-inline-flex align-items-center">
                Learn More <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="service-card p-5 bg-white border rounded shadow-sm h-100 text-start">
              <div className="icon-box d-inline-flex align-items-center justify-content-center bg-primary-subtle rounded-circle p-3 mb-4 text-primary fs-3" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-megaphone"></i>
              </div>
              <h3 className="h5 fw-bold text-dark mb-3">Digital Marketing</h3>
              <p className="text-secondary small mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <a href="#" className="text-primary fw-semibold text-decoration-none small d-inline-flex align-items-center">
                Learn More <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="service-card p-5 bg-white border rounded shadow-sm h-100 text-start">
              <div className="icon-box d-inline-flex align-items-center justify-content-center bg-primary-subtle rounded-circle p-3 mb-4 text-primary fs-3" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-palette"></i>
              </div>
              <h3 className="h5 fw-bold text-dark mb-3">Creative Design</h3>
              <p className="text-secondary small mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <a href="#" className="text-primary fw-semibold text-decoration-none small d-inline-flex align-items-center">
                Learn More <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="service-card p-5 bg-white border rounded shadow-sm h-100 text-start">
              <div className="icon-box d-inline-flex align-items-center justify-content-center bg-primary-subtle rounded-circle p-3 mb-4 text-primary fs-3" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-code-slash"></i>
              </div>
              <h3 className="h5 fw-bold text-dark mb-3">Web Development</h3>
              <p className="text-secondary small mb-4">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
              </p>
              <a href="#" className="text-primary fw-semibold text-decoration-none small d-inline-flex align-items-center">
                Learn More <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="service-card p-5 bg-white border rounded shadow-sm h-100 text-start">
              <div className="icon-box d-inline-flex align-items-center justify-content-center bg-primary-subtle rounded-circle p-3 mb-4 text-primary fs-3" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-megaphone"></i>
              </div>
              <h3 className="h5 fw-bold text-dark mb-3">Digital Marketing</h3>
              <p className="text-secondary small mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <a href="#" className="text-primary fw-semibold text-decoration-none small d-inline-flex align-items-center">
                Learn More <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="team" className="team section py-5 bg-light">
      <div className="container" data-aos="fade-up">
        <div className="section-title text-center mb-5">
          <h2 className="display-5 fw-bold text-dark position-relative d-inline-block pb-3">
            Team
            <span 
              className="position-absolute bottom-0 start-50 translate-middle-x bg-primary" 
              style={{ width: '50px', height: '3px' }}
            ></span>
          </h2>
          <p className="text-muted mt-3">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
          </p>
        </div>
        <div className="row g-4">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div className="team-member d-flex align-items-start bg-white border p-4 rounded shadow-sm h-100">
              <div className="pic me-4">
                <img src="https://bootstrapmade.com/content/demo/Devin/assets/img/person/person-m-7.webp" className="img-fluid rounded" alt="Walter White" style={{ width: '160px', height: '160px', objectFit: 'cover' }} />
              </div>
              <div className="member-info text-start">
                <h4 className="fw-bold text-dark mb-1 fs-5">Walter White</h4>
                <span className="text-muted small d-block mb-3">Chief Executive Officer</span>
                <p className="text-secondary small mb-4">
                  Aliquam iure quaerat voluptatem praesentium possimus unde laudantium vel dolorum distinctio dire flow
                </p>
                <div className="social d-flex gap-3 text-secondary">
                  <a href="#" className="text-secondary"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="text-secondary"><i className="bi bi-twitter-x"></i></a>
                  <a href="#" className="text-secondary"><i className="bi bi-linkedin"></i></a>
                  <a href="#" className="text-secondary"><i className="bi bi-youtube"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div className="team-member d-flex align-items-start bg-white border p-4 rounded shadow-sm h-100">
              <div className="pic me-4">
                <img src="https://bootstrapmade.com/content/demo/Devin/assets/img/person/person-m-7.webp" className="img-fluid rounded" alt="Sarah Jhonson" style={{ width: '160px', height: '160px', objectFit: 'cover' }} />
              </div>
              <div className="member-info text-start">
                <h4 className="fw-bold text-dark mb-1 fs-5">Sarah Jhonson</h4>
                <span className="text-muted small d-block mb-3">Product Manager</span>
                <p className="text-secondary small mb-4">
                  Labore ipsum sit consequatur exercitationem rerum laboriosam laudantium aut quod dolores exercitationem ut
                </p>
                <div className="social d-flex gap-3 text-secondary">
                  <a href="#" className="text-secondary"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="text-secondary"><i className="bi bi-twitter-x"></i></a>
                  <a href="#" className="text-secondary"><i className="bi bi-linkedin"></i></a>
                  <a href="#" className="text-secondary"><i className="bi bi-youtube"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
            <div className="team-member d-flex align-items-start bg-white border p-4 rounded shadow-sm h-100">
              <div className="pic me-4">
                <img src="https://bootstrapmade.com/content/demo/Devin/assets/img/person/person-m-7.webp" className="img-fluid rounded" alt="William Anderson" style={{ width: '160px', height: '160px', objectFit: 'cover' }} />
              </div>
              <div className="member-info text-start">
                <h4 className="fw-bold text-dark mb-1 fs-5">William Anderson</h4>
                <span className="text-muted small d-block mb-3">CTO</span>
                <p className="text-secondary small mb-4">
                  Illum minima ea autem doloremque ipsum quidem quas aspernatur modi ut praesentium vel tque sed facilis at qui
                </p>
                <div className="social d-flex gap-3 text-secondary">
                  <a href="#" className="text-secondary"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="text-secondary"><i className="bi bi-twitter-x"></i></a>
                  <a href="#" className="text-secondary"><i className="bi bi-linkedin"></i></a>
                  <a href="#" className="text-secondary"><i className="bi bi-youtube"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="400">
            <div className="team-member d-flex align-items-start bg-white border p-4 rounded shadow-sm h-100">
              <div className="pic me-4">
                <img src="https://bootstrapmade.com/content/demo/Devin/assets/img/person/person-m-7.webp" className="img-fluid rounded" alt="Amanda Jepson" style={{ width: '160px', height: '160px', objectFit: 'cover' }} />
              </div>
              <div className="member-info text-start">
                <h4 className="fw-bold text-dark mb-1 fs-5">Amanda Jepson</h4>
                <span className="text-muted small d-block mb-3">Accountant</span>
                <p className="text-secondary small mb-4">
                  Magni voluptatem accusamus assumenda cum nisi aut qui dolorem voluptate sed et veniam quasi quam consectetur
                </p>
                <div className="social d-flex gap-3 text-secondary">
                  <a href="#" className="text-secondary"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="text-secondary"><i className="bi bi-twitter-x"></i></a>
                  <a href="#" className="text-secondary"><i className="bi bi-linkedin"></i></a>
                  <a href="#" className="text-secondary"><i className="bi bi-youtube"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="contact" className="contact section py-5 bg-white">
      <div className="container" data-aos="fade-up">
        <div className="section-title text-center mb-5">
          <h2 className="display-5 fw-bold text-dark position-relative d-inline-block pb-3">
            Contact
            <span 
              className="position-absolute bottom-0 start-50 translate-middle-x bg-primary" 
              style={{ width: '50px', height: '3px' }}
            ></span>
          </h2>
          <p className="text-muted mt-3">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
          </p>
        </div>
        <div className="row g-5 mt-2">
          <div className="col-lg-7 text-start">
            <h3 className="h2 fw-bold text-dark mb-3">Let's Start a Conversation</h3>
            <p className="text-secondary mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur excepteur sint occaecat cupidatat.
            </p>
            <form className="contact-form">
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label text-uppercase text-muted fw-bold small tracking-wider mb-1">Name</label>
                  <input type="text" className="form-control border-0 border-bottom rounded-0 px-0 pb-2 shadow-none" placeholder="Your Name" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-uppercase text-muted fw-bold small tracking-wider mb-1">Email</label>
                  <input type="email" className="form-control border-0 border-bottom rounded-0 px-0 pb-2 shadow-none" placeholder="Your Email" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-uppercase text-muted fw-bold small tracking-wider mb-1">Phone</label>
                  <input type="tel" className="form-control border-0 border-bottom rounded-0 px-0 pb-2 shadow-none" placeholder="Your Phone" />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-uppercase text-muted fw-bold small tracking-wider mb-1">Subject</label>
                  <input type="text" className="form-control border-0 border-bottom rounded-0 px-0 pb-2 shadow-none" placeholder="Subject" required />
                </div>
                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-primary px-4 py-2 rounded shadow-sm">
                    Submit Message
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-5 text-start">
            <div className="info-box p-5 bg-light rounded h-100">
              <h3 className="h4 fw-bold text-dark mb-3">Get in Touch</h3>
              <p className="text-secondary small mb-5">
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.
              </p>
              <div className="d-flex flex-column gap-4">
                <div className="info-item d-flex align-items-start">
                  <div className="icon text-primary fs-4 me-3 mt-1">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div>
                    <h5 className="text-uppercase text-muted fw-bold small tracking-wider mb-1">Address</h5>
                    <p className="text-dark small mb-0">892 Park Avenue, Manhattan<br />New York, NY 10075</p>
                  </div>
                </div>
                <div className="info-item d-flex align-items-start">
                  <div className="icon text-primary fs-4 me-3 mt-1">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div>
                    <h5 className="text-uppercase text-muted fw-bold small tracking-wider mb-1">Email</h5>
                    <p className="text-dark small mb-0">hello@businessdemo.com</p>
                  </div>
                </div>
                <div className="info-item d-flex align-items-start">
                  <div className="icon text-primary fs-4 me-3 mt-1">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <div>
                    <h5 className="text-uppercase text-muted fw-bold small tracking-wider mb-1">Phone</h5>
                    <p className="text-dark small mb-0">+1 5589 55488 55</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
export default Home
