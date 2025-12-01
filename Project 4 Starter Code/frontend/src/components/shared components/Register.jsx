import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");

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
      <button>Register</button>
    </div>
  );
};

export default Register;
