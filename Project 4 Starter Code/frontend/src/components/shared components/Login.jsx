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
      <div className="card">
        <h2>
          Welcome Back
        </h2>
        <p>
          Login to continue
        </p>

        <div>
          <label>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button onClick={confirmLogin}>
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link
            to="/users/register">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
