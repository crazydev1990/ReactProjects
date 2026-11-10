import React from 'react'
import ReactDom from 'react-dom'
import { useState } from 'react'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Service from './components/Service'
import Gallery from './components/Gallery'
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import { createBrowserRouter as Router,Outlet,RouterProvider } from 'react-router-dom'
import './App.css'

const Layout=()=>{
  return (
    <>
    <Header/>{/* Show Header on render n make common call for all child components */}
    <Outlet/>{/* Show child component content on render like home,about,service etc */}
    <Footer/>{/* Show Footer on render n make common call for all child components */}
    </>
  )
}
function App() {
  const router=Router([
           {
                path:'/',
                element:<Layout/>,
                children:[
                    {
                      path:'/home',
                      element:<Home/>
                    },
                    {
                      path:'/about',
                      element:<About/>
                    },
                    {
                      path:'/service',
                      element:<Service/>
                    },
                    {
                      path:'/contact',
                      element:<Contact/>
                    },
                    {
                      path:'/gallery',
                      element:<Gallery/>
                    },
                ]
           },
           {
             path:'/register',
             element:<Register/>
           },
           {
             path:'/login',
             element:<Login/>
           }
  ]);

  return (
    <>
      <RouterProvider router={router}/>
      {/* <Home/> */}
      {/* <About/> */}
      {/* <Service/> */}
      {/* <Contact/> */}
      {/* <Gallery/> */}
      {/* <Register/> */}
      {/* <Login/> */}
    </>
  )
}

export default App
