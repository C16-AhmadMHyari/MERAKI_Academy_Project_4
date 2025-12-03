import React, { useState, useEffect, createContext, useContext } from "react";
import "./App.css";
import Navbar from "./components/shared components/Navbar";
import Login from "./components/shared components/Login";
import Categories from "./components/shared components/Categories";
import Register from "./components/shared components/Register";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./components/shared components/Home";
import About from "./components/shared components/About";
import AdminPanel from "./components/Admin/AdminPanel";

export const appContext = createContext();

const App = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  return (
    <div className="App">
      {" "}
      <appContext.Provider value={{ token, setToken, role, setRole }}>
        <h1>OneHand</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {!token && <Route path="/users/register" element={<Register />} />}
          {!token && <Route path="/users/login" element={<Login />} />}
          <Route path="/users/adminpanel" element={<AdminPanel />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </appContext.Provider>
      {token && <button onClick={()=>{navigate(-1)}}>Back</button>}
    </div>
  );
};

export default App;
