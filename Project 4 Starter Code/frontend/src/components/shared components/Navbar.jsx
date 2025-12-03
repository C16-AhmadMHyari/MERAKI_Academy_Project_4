import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import { appContext } from "../../App";

const Navbar = () => {
  const { token, setToken, role, setRole } = useContext(appContext);

  return token ? (
    <div style={{ display: "flex", gap: "16px" }}>
      <Link to="/">Home</Link>
      {role === "ADMIN" && <Link to="/users/adminpanel">Admin Panel</Link>}
      {role === "USER" && <Link to="/categories">Fields of Support</Link>}
      {role === "USER" && <Link>Urgent Campagins</Link>}
      <Link to="/about"> About</Link>
      <Link
        to="/"
        onClick={() => {
          localStorage.clear();
          setToken(null);
          setRole(null);
        }}
      >
        Logout
      </Link>
    </div>
  ) : (
    <div style={{ display: "flex", gap: "16px" }}>
      <Link to="/">Home</Link>
      <Link to="users/login">Login</Link>
      <Link to="users/register">Register</Link>
      <Link to="/categories">Fields of Support</Link>
      <Link>Urgent Campagins</Link>
      <Link to="/about"> About</Link>
    </div>
  );
};
export default Navbar;
