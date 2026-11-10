import React from 'react';
import { NavLink,createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-3 bg-light p-3 border rounded">
          <h4 className="mb-4 text-primary">Dashboard</h4>
          <ul className="list-unstyled">
            <li className="mb-2">
              <NavLink to="/dashboard/profile" className="btn btn-outline-primary w-100 text-start">
                Profile
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/dashboard/settings" className="btn btn-outline-primary w-100 text-start">
                Settings
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/dashboard/logout" className="btn btn-outline-danger w-100 text-start">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-md-9 p-4 border rounded bg-white shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
