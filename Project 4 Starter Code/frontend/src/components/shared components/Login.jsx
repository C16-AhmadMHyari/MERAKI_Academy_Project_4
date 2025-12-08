import React, { useState, useContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Register from "./Register";
import axios from "axios";
import Home from "./Home";
import { appContext } from "../../App";

const Login = () => {
  const { setToken, setRole } = useContext(appContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const confirmLogin = async () => {
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email: email,
        password: password,
      });

      const { firstName, role, token, userId } = result.data;
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("role", role.role);
      localStorage.setItem("permessions", JSON.stringify(role.permissions));
      setRole(role.role);
      setToken(token);
      navigate("/");
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
