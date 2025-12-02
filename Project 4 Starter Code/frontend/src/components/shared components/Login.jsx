import React, { useState } from "react";
import { Routes, Route, Link,useNavigate } from "react-router-dom";
import Register from "./Register";
import axios from "axios"
import Home from "./Home";

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const confirmLogin = async () => {
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", result.data.token)
      navigate('/')
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      email{" "}
      <input
        type="email"
        placeholder="enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />{" "}
      <br />
      password
      <input
        type="password"
        placeholder="Enter your password here"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button onClick={confirmLogin}>Login</button>
      <br />
      <div>
        If you are not user, please rigester here{" "}
        <Link to="/users/register">Register</Link>
      </div>
    </div>
  );
};
//onClick={()=>{localStorage.setItem("login" , true)}
export default Login;
