import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { appContext } from "../../App";

const Register = () => {
  const { setToken, setRole } = useContext(appContext);
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
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "400px", margin: "50px auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Create Account
        </h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
          Join us today
        </p>

        <div style={{ marginBottom: "15px" }}>
          <input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            placeholder="Phone Number"
            onChange={(e) => setphoneNumber(e.target.value)}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </div>

        <button onClick={confirmRegistration} style={{ width: "100%" }}>
          Register
        </button>

        <p style={{ marginTop: "20px", textAlign: "center", color: "#666" }}>
          Already have an account?{" "}
          <Link
            to="/users/login"
            style={{ color: "#4a90e2", textDecoration: "none" }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
