import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { appContext } from "../../App";

const Login = () => {
  const { setToken, setRole } = useContext(appContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="container">
      <div className="card" style={{ maxWidth: "400px", margin: "50px auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Welcome Back
        </h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
          Login to continue
        </p>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#333" }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#333" }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </div>

        <button onClick={confirmLogin} style={{ width: "100%" }}>
          Login
        </button>

        <p style={{ marginTop: "20px", textAlign: "center", color: "#666" }}>
          Don't have an account?{" "}
          <Link
            to="/users/register"
            style={{ color: "#4a90e2", textDecoration: "none" }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
