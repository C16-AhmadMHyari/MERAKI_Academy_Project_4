import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";


const Navbar = () => {
  // const login = localStorage.getItem("login")
  return (
    <div style={{  display: "flex", gap:"16px" }}>
        <Link to="/">Home</Link>
     <Link to="/login">Login</Link> 
     <Link to='/register'>Register</Link>
      <Link to="/categories">Fields of Support</Link>
      {/* <Link>Urgent Campaigns</Link> */}
      <Link to="/about"> About</Link>
    </div>
  );
};
export default Navbar;
