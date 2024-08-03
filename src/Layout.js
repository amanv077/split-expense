import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Homepage/Navbar/page";
import Footer from "./components/Homepage/Footer/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
