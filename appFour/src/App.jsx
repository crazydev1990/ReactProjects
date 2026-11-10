import React from 'react'
import ReactDom from 'react-dom'
import './App.css'
import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Settings from './components/Settings'
import Logout from './components/Logout'

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Dashboard /> 
  },  
  {
    path: "/dashboard",
    element: <Dashboard />, // મેઇન પેજ
    children: [
      { path: "profile", element: <Profile /> },   
      { path: "settings", element: <Settings /> },
      { path: "logout", element: <Logout /> }    
    ]  
  }
])
function App() {
    return (
    <>
         <RouterProvider router={router} />
    </>
  )
}
export default App
