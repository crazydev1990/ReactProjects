import React from 'react';
import { useParams } from 'react-router-dom'; 

function Profile() {
  const { empId } = useParams(); 
let employeeName = "";
  let employeeRole = "";
  let employeeEmail = "";
  let employeePhone = "";
  let employeeBlood = "";
  let employeeCity="";
  let employeePic="";
  if (empId === "E102") {
    employeeName = "Neha Sharma";
    employeeRole = "UI/UX Designer";
    employeeEmail = "neha@company.com";
    employeePhone = "+91 98765 43211";
    employeeCity="Mumbai";
    employeeBlood = "A+ve";
    employeePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLuILOdz5hhPYhxzmEK8nbtOkUtm9gU3bnywcfKuBafg&s=10";
  } else if (empId === "E103") {
    employeeName = "Rajesh Mehta";
    employeeRole = "Project Manager";
    employeeEmail = "rajesh@company.com";
    employeePhone = "+91 98765 43212";
    employeeCity="Delhi";
    employeeBlood = "B+ve";
    employeePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0d-Odvv3ws-1282i_343PsVOG6JvABQOObNgXOEYUZQ&s=10";
  }else if (empId === "E101") {
    employeeName = "Sanjay Patel";
    employeeRole = "React Developer";
    employeeEmail = "sanjay@company.com";
    employeePhone = "+91 98765 43210";
    employeeCity="Pune";
    employeeBlood = "O+ve";
    employeePic="https://png.pngtree.com/png-vector/20250621/ourmid/pngtree-cartoon-male-office-worker-with-bag-png-image_16568103.png";
  }

  return (   
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow" style={{ width: '300px', border: '2px solid #0d6efd', borderRadius: '10px' }}>
        <div className="bg-primary text-white text-center py-3">
          <h5 className="mb-0"> 🏢 TechCorp HR Portal</h5>
          <small>Identity Card</small>
        </div>
       <div className="card-body">
          <img className="card-img-top" src={employeePic} alt="Employee" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
          <h4 className="card-title text-center text-dark fw-bold mb-3">{employeeName}</h4>
          <p className="card-text"><b>Emp ID:</b> {empId || "E101"}</p>
          <p className="card-text"><b>Role:</b> {employeeRole}</p>
          <p className="card-text"><b>Blood Group:</b> {employeeBlood}</p>
          <p className="card-text"><b>Email:</b> {employeeEmail}</p>
          <p className="card-text"><b>Phone:</b> {employeePhone}</p>
          <p className="card-text"><b>City:</b> {employeeCity}</p>
        </div>
        <div className="bg-light text-center py-2" style={{ borderTop: '1px solid #ddd' }}>
          <span className="text-danger fw-bold" style={{ fontSize: '12px' }}>VALID CARD</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
