import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "./components/Homepage/Navbar/page";
import Footer from "./components/Homepage/Footer/Footer";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Navbar />
      {/* Main content area with padding for fixed navbar */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: { xs: "64px", sm: "70px" },
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
