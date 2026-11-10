
import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

const Layout = ({ user, handleLogout }) => {

  return (

    <div className="app-layout">

      <Header
        user={user}
        handleLogout={handleLogout}
      />

      <main className="main-content">
        <Outlet />
      </main>

      <ChatBot />

      <Footer />

    </div>

  );

};

export default Layout;
