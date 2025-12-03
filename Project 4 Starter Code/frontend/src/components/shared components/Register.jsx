import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import { appContext } from "../../App";

const Register = () => {
  const { token, setToken, role, setRole } = useContext(appContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const confirmRegistration = () => {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      country: country,
      password: password,
      phoneNumber: phoneNumber,
      email: email,
      role: "69280f7349d6a06052244e22",
    };

    axios
      .post("http://localhost:5000/users/register", newUser)
      .then((res) =>
        axios
          .post("http://localhost:5000/users/login", {
            email: email,
            password: password,
          })
          .then((loginRes) => {
            localStorage.setItem("token", loginRes.data.token);
            setToken(loginRes.data.token);
            localStorage.setItem("role", loginRes.data.role.role);
            setRole(loginRes.data.role.role);
            localStorage.setItem("firstName", loginRes.data.firstName);
            localStorage.setItem(
              "permissions",
              JSON.stringify(loginRes.data.role.permissions)
            );
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          })
      )
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Please put your data to complete registeration</h2>
      <input
        placeholder="First Name"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Phone Number"
        onChange={(e) => {
          setphoneNumber(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Country where you live now"
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      <br />
      <input
        type="email"
        placeholder="Your Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button onClick={confirmRegistration}>Register</button>
    </div>
  );
};

export default Register;
