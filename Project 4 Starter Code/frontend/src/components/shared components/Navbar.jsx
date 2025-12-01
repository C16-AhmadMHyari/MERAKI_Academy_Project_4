import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";


const Navbar = () => {
  // const login = localStorage.getItem("login")
  return (
    <div style={{  display: "flex" }}>
        <Link to="/">Home</Link>
     <Link to="/login">Login</Link> 
     <Link to='/register'>Register</Link>
      <Link to="/categories">Fields of Support</Link>
    </div>
  );
};
export default Navbar;
