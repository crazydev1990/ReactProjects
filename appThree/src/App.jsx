import React from 'react'
import ReactDom from 'react-dom'
// ૧. અહીં આપણે 'as Router' કાઢી નાખ્યું અને 'router' ને સ્મોલ અક્ષરોમાં રાખ્યું છે
import { createBrowserRouter, Outlet, RouterProvider as Provider } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Products from './components/Products'
import Product from './components/Product'
import Profile from './components/Profile'
import Header from './common/Header'
import Footer from './common/Footer'

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

 const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Profile /> },
      { path: "profile/:empId", element: <Profile /> }
    ]
  }
]);
function App() {
 

  return (
    <>
      <Provider router={router}/>
    </>
  )
}

export default App
