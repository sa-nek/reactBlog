import React from "react";
import Header from "./Layout/Header";
import Nav from "./Layout/Nav";
import Footer from "./Layout/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ search, setSearch }) => {
  return (
    <>
      <Header />
      <Nav search={search} setSearch={setSearch} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
