import React from 'react'

const Login = () => {
  return (
   <>
   <section className="vh-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#212529', color: '#fff', width: '100%' }}>
      <div className="container py-5">
        <div className="row d-flex align-items-center justify-content-center g-4">
          <div className="col-md-6 col-lg-6 text-center">
            <img 
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" 
              className="img-fluid" 
              alt="Login vector" 
              style={{ maxWidth: '90%', height: 'auto' }}
            />
          </div>
          <div className="col-md-6 col-lg-5 offset-lg-1 text-start px-4">
            <form style={{ width: '100%' }}>
              <div className="d-flex align-items-center mb-4 gap-2">
                <span className="lead fw-normal mb-0 fs-6 text-white">Sign in with</span>
                <button type="button" className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', backgroundColor: '#3b5998', border: 'none' }}><i className="bi bi-facebook"></i></button>
                <button type="button" className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', backgroundColor: '#55acee', border: 'none' }}><i className="bi bi-twitter-x"></i></button>
                <button type="button" className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', backgroundColor: '#0077b5', border: 'none' }}><i className="bi bi-linkedin"></i></button>
              </div>
              <div className="d-flex align-items-center my-4">
                <hr className="flex-grow-1" style={{ borderColor: 'rgba(255,255,255,0.15)' }} />
                <span className="mx-3 small text-white fw-bold">Or</span>
                <hr className="flex-grow-1" style={{ borderColor: 'rgba(255,255,255,0.15)' }} />
              </div>
              <div className="form-group mb-4">
                <label className="small text-white mb-1 d-block">Email address</label>
                <input type="email" className="form-control bg-transparent text-white border-0 border-bottom rounded-0 px-0 pb-2 shadow-none w-100" style={{ borderColor: 'rgba(255,255,255,0.3)' }} required />
              </div>
              <div className="form-group mb-4">
                <label className="small text-white mb-1 d-block">Password</label>
                <input type="password" className="form-control bg-transparent text-white border-0 border-bottom rounded-0 px-0 pb-2 shadow-none w-100" style={{ borderColor: 'rgba(255,255,255,0.3)' }} required />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4 small">
                <div className="form-check d-flex align-items-center gap-2">
                  <input className="form-check-input bg-transparent border-secondary" type="checkbox" id="remMe" />
                  <label className="form-check-label text-white" htmlFor="remMe">Remember me</label>
                </div>
                <a href="#forgot" className="text-white text-decoration-none">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2 fs-6 fw-bold rounded-1" style={{ backgroundColor: '#3b71ca', border: 'none' }}>
                LOGIN
              </button>
              <p className="small fw-semibold mt-3 pt-1 mb-0 text-white">
                  Not have an Account ? <a href="/register" className="text-danger text-decoration-none fw-bold ms-1">Register</a>
                </p>
            </form>
          </div>
        </div>
      </div>
    </section>
   </>
  )
}
export default Login
