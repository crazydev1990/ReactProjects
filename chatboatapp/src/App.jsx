
import React, { useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import Layout from "./layouts/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Testimonial from "./pages/Testimonial";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

const App = () => {

  // USER DATA
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("cloudify_user");
      const savedToken = localStorage.getItem("cloudify_token");

      return savedUser && savedToken
        ? JSON.parse(savedUser)
        : null;

    } catch {
      return null;
    }
  });

  // LOGIN API
  const handleLogin = async (username, password) => {

    const response = await fetch(
      "https://dummyjson.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login Failed");
    }

    localStorage.setItem(
      "cloudify_user",
      JSON.stringify(data)
    );

    localStorage.setItem(
      "cloudify_token",
      data.accessToken
    );

    setUser(data);

    return data;
  };

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("cloudify_user");
    localStorage.removeItem("cloudify_token");

    setUser(null);
  };

  // LOGIN CHECK
  const isLoggedIn = Boolean(
    user && localStorage.getItem("cloudify_token")
  );

  // ROUTER CONFIGURATION
  const router = createBrowserRouter([

    {
      path: "/",

      element: (
        <Layout
          user={user}
          handleLogout={handleLogout}
        />
      ),

      children: [

        // PUBLIC PAGES

        {
          index: true,
          element: <Home />
        },

        {
          path: "about",
          element: <About />
        },

        {
          path: "services",
          element: <Service />
        },

        {
          path: "gallery",
          element: <Gallery />
        },

        {
          path: "team",
          element: <Team />
        },

        {
          path: "testimonials",
          element: <Testimonial />
        },

        {
          path: "pricing",
          element: <Pricing />
        },

        // LOGIN

        {
          path: "login",
          element: (
            <Login
              handleLogin={handleLogin}
              isLoggedIn={isLoggedIn}
            />
          )
        },

        // PROTECTED DASHBOARD

        {
          path: "dashboard",
          element: isLoggedIn
            ? (
              <Dashboard
                user={user}
                handleLogout={handleLogout}
              />
            )
            : <Navigate to="/login" replace />
        },

        // PROTECTED PROFILE

        {
          path: "profile",
          element: isLoggedIn
            ? (
              <Profile
                user={user}
                handleLogout={handleLogout}
              />
            )
            : <Navigate to="/login" replace />
        },

        // 404

        {
          path: "*",
          element: (
            <div className="not-found">
              <h1>404</h1>
              <h2>Page Not Found</h2>
              <a href="/">Back To Home</a>
            </div>
          )
        }

      ]

    }

  ]);

  return <RouterProvider router={router} />;

};

export default App;
