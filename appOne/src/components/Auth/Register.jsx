import React from 'react'

const Register = () => {
  return (
    <>
     <section className="d-flex align-items-center justify-content-center p-3" style={{ backgroundColor: '#212529', minHeight: '100vh', color: '#fff' }}>
      <div className="card text-white p-4 p-md-5 shadow-lg position-relative border-0" style={{ backgroundColor: '#2c3034', borderRadius: '15px', maxWidth: '900px', width: '100%' }}>
        <div className="row align-items-center">
          <div className="col-md-6 order-2 order-md-1 text-start">
            <h2 className="fw-bold mb-4 fs-3 text-white text-center text-md-start">Sign up</h2>
             <form>
              <div className="d-flex align-items-center mb-4 position-relative">
                <i className="bi bi-person-fill text-white fs-5 me-3"></i>
                <input 
                  type="text" 
                  className="form-control bg-transparent text-white border p-2 px-3 rounded shadow-none w-100" 
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }} 
                  placeholder="Your Name" 
                  required 
                />
              </div>
              <div className="d-flex align-items-center mb-4 position-relative">
                <i className="bi bi-envelope-fill text-white fs-5 me-3"></i>
                <input 
                  type="email" 
                  className="form-control bg-transparent text-white border p-2 px-3 rounded shadow-none w-100" 
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }} 
                  placeholder="Your Email" 
                  required 
                />
              </div>
              <div className="d-flex align-items-center mb-4 position-relative">
                <i className="bi bi-lock-fill text-white fs-5 me-3"></i>
                <input 
                  type="password" 
                  className="form-control bg-transparent text-white border p-2 px-3 rounded shadow-none w-100" 
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }} 
                  placeholder="Password" 
                  required 
                />
              </div>
              <div className="d-flex align-items-center mb-4 position-relative">
                <i className="bi bi-key-fill text-white fs-5 me-3"></i>
                <input 
                  type="password" 
                  className="form-control bg-transparent text-white border p-2 px-3 rounded shadow-none w-100" 
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }} 
                  placeholder="Repeat your password" 
                  required 
                />
              </div>
              <div className="form-check d-flex align-items-center mb-4 gap-2 small">
                <input 
                  className="form-check-input bg-transparent border-secondary shadow-none" 
                  type="checkbox" 
                  id="termsCheck" 
                  required 
                />
                <label className="form-check-label text-white" htmlFor="termsCheck">
                  I agree all statements in <a href="#terms" className="text-primary text-decoration-underline">Terms of service</a>
                </label>
              </div>
              <div className="text-center text-md-start mt-4">
                <button 
                  type="submit" 
                  className="btn btn-primary px-4 py-2 fw-semibold rounded shadow-sm text-uppercase" 
                  style={{ backgroundColor: '#3b71ca', border: 'none', minWidth: '130px', fontSize: '13px', letterSpacing: '0.5px' }}
                >
                  Register
                </button>
                <p className="small fw-semibold mt-3 pt-1 mb-0 text-white">
                  Already have an account? <a href="/login" className="text-danger text-decoration-none fw-bold ms-1">Login</a>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-6 order-1 order-md-2 text-center mb-4 mb-md-0">
            <img 
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" 
              className="img-fluid" 
              alt="Registration vector graphic" 
              style={{ maxWidth: '90%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
export default Register
