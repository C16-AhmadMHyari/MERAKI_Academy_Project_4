import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <h2>Please put your data to complete registeration</h2>
      <input placeholder="First Name" />
      <input type="text" placeholder="Last Name"/>
    </div>
  );
};

export default Register