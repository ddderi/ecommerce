import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Announcement />
      <Navbar />

      <Outlet />
    </>
  );
};

export default RootLayout;
