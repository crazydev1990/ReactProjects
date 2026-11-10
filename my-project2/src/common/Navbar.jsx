import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  //  સાચી જગ્યા: useNavigate હંમેશા ફંક્શનની અંદર, સૌથી ઉપર હોવો જોઈએ
  const navigateToUrl = useNavigate();

  const count = JSON.parse(localStorage.getItem("cart"))?.length || 0;
  console.log(count);

  function moreDetails(){
    console.log("You clicked Cart icon");
    navigateToUrl("/moreDetails");
  }

  return (
    <nav className="bg-[#fde047] px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="https://static.vecteezy.com/system/resources/previews/058/072/383/non_2x/flipkart-app-3d-icon-on-transparent-background-free-png.png" 
            alt="Logo" 
            className="h-18 object-contain"
          />
        </div>
        <div className="flex items-center gap-6 text-lg font-medium text-gray-800">
          <a href="#" className="hover:text-blue-600 transition-colors" style={{ textDecoration: "none" }}>Home</a>
          <a href="#" className="hover:text-blue-600 transition-colors" style={{ textDecoration: "none" }}>About</a>
          <a href="#" className="hover:text-blue-600 transition-colors" style={{ textDecoration: "none" }}>Contact</a>
          <a href="#" className="hover:text-blue-600 transition-colors" style={{ textDecoration: "none" }}>Services</a>
          <a href="#" className="hover:text-blue-600 transition-colors" style={{ textDecoration: "none" }}>Blog</a>
          <a href="#" className="bg-amber-700 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-all" style={{ textDecoration: "none" }}>Gallery</a>
          <div className="relative cursor-pointer ms-2" onClick={moreDetails}>
            <span className="text-2xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{count}</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
