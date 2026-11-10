import React from 'react';

function Settings() {
  return (
    <div>
      <h3>⚙️ <h4 className="mb-4 fw-bold text-dark border-bottom pb-2">Account Settings</h4></h3>
          <div>
      
      <div className="mb-4">
        <h5 className="text-secondary small fw-bold text-uppercase mb-3">Preferences</h5>
        <div className="form-check form-switch mb-3 p-3 bg-light rounded d-flex justify-content-between align-items-center ps-5">
          <div>
            <label className="form-check-label fw-semibold text-dark" htmlFor="notiSwitch">Email Notifications</label>
            <small className="d-block text-muted">કંપનીની દરેક નવી અપડેટ ઇમેઇલ પર મેળવો.</small>
          </div>
          <input className="form-check-input ms-0" type="checkbox" id="notiSwitch" defaultChecked />
        </div>
        <div className="form-check form-switch mb-3 p-3 bg-light rounded d-flex justify-content-between align-items-center ps-5">
          <div>
            <label className="form-check-label fw-semibold text-dark" htmlFor="themeSwitch">Dark Mode (Beta)</label>
            <small className="d-block text-muted">આખી એપ્લિકેશનને ડાર્ક થીમમાં બદલો.</small>
          </div>
          <input className="form-check-input ms-0" type="checkbox" id="themeSwitch" />
        </div>
      </div>
      <div>
        <h5 className="text-secondary small fw-bold text-uppercase mb-3">Security</h5>
        <div className="card border p-3 rounded">
          <h6 className="fw-bold mb-3 text-dark">Change Password</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <input type="password" className="form-control form-control-sm" placeholder="Current Password" />
            </div>
            <div className="col-md-6">
              <input type="password" className="form-control form-control-sm" placeholder="New Password" />
            </div>
            <div className="col-12">
              <button className="btn btn-dark btn-sm px-4 fw-bold">Update Password</button>
            </div>
          </div>
        </div>
      </div>

    </div>
    </div>
  );
}

export default Settings;
