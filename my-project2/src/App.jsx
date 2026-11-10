import React from 'react'
import './App.css'
import AllProducts from './components/AllProducts'
import Navbar from './common/Navbar'
import Footer from './common/Footer'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import MoreDetails from './components/MoreDetails'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

// 1. router ને App ફંક્શનની બહાર કાઢી લીધું
const myrouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/', // આ મેઇન હોમ પેજ બનશે
        element: <AllProducts />,
      },
      {
        path: '/moreDetails', // આ લિંક http://localhost:3000/moreDetails પર ખુલશે
        element: <MoreDetails />
      }
    ]
  }
])

function App() {  
  return (
    <>
      <RouterProvider router={myrouter} />    
    </>
  )
}

export default App;
