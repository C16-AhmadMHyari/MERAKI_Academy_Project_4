import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";

const Navbar = () => {
  // const login = localStorage.getItem("login")
  const token = localStorage.getItem("token");
  return !token ? (
    <div style={{ display: "flex", gap: "16px" }}>
      <Link to="/">Home</Link>
      <Link to="users/login">Login</Link>
      <Link to="users/register">Register</Link>
      <Link to="/categories">Fields of Support</Link>
      {/* <Link>Urgent Campaigns</Link> */}
      <Link to="/about"> About</Link>
    </div>
  ) : (
    <div style={{ display: "flex", gap: "16px" }}>
      <Link to="/">Home</Link>
      <Link to="/categories">Fields of Support</Link>
      {/* <Link>Urgent Campaigns</Link> */}
      <Link to="/about"> About</Link>
    </div>
  );
};
export default Navbar;
