import React from 'react';

function Profile() {
    const user = {
    name: "Sanjay Patel",
    role: "React Developer",
    email: "sanjay@company.com",
    phone: "+91 98765 43210",
    location: "Ahmedabad, India",
    joined: "January 2024",
    pic: "https://static.vecteezy.com/system/resources/previews/054/956/282/non_2x/office-worker-cartoon-character-free-vector.jpg"
  };
  return (
    <div>
      <h3>👤 My Profile</h3>
      <div className="card border-0">
      <div className="card-body p-0">
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-4 mb-md-0">
            <img 
              src={user.pic} 
              alt={user.name} 
              className="rounded-circle img-thumbnail shadow-sm mb-3"
              style={{ width: '140px', height: '140px', objectFit: 'cover' }}
            />
            <h5 className="fw-bold mb-1">{user.name}</h5>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill">
              {user.role}
            </span>
          </div>
          <div className="col-md-8 border-start-md">
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="text-muted small d-block">Email Address</label>
                <span className="fw-semibold text-dark">{user.email}</span>
              </div>
              <div className="col-sm-6">
                <label className="text-muted small d-block">Phone Number</label>
                <span className="fw-semibold text-dark">{user.phone}</span>
              </div>
              <div className="col-sm-6">
                <label className="text-muted small d-block">Location</label>
                <span className="fw-semibold text-dark">{user.location}</span>
              </div>
              <div className="col-sm-6">
                <label className="text-muted small d-block">Member Since</label>
                <span className="fw-semibold text-dark">{user.joined}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <button className="btn btn-primary btn-sm px-4 fw-bold">Edit Profile</button>
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}

export default Profile;
