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
      <div className="card">
        <h2>
          Create Account
        </h2>
        <p>
          Join us today
        </p>

        <div>
          <input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div>
          <input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div>
          <input
            placeholder="Phone Number"
            onChange={(e) => setphoneNumber(e.target.value)} />
        </div>

        <div>
          <input
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)} />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button onClick={confirmRegistration}>
          Register
        </button>

        <p>
          Already have an account?{" "}
          <Link
            to="/users/login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
