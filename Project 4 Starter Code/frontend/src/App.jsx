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
import AdminCategories from "./components/Admin/AdminCategories";
import AdminCategory from "./components/Admin/AdminCategory";
import AdminAddNewCategory from "./components/Admin/AdminAddNewCategory"
import AdminCategoryUpdate from "./components/Admin/AdminCategoryUpdate"
import AdminPackages from "./components/Admin/AdminPackages";
import AdminPackageUpdate from "./components/Admin/AdminPackageUpdate";
import AdminPackage from "./components/Admin/AdminPackage";
import AdminAddNewPackage from "./components/Admin/AdminAddNewPackage"
import AdminShowUsers from "./components/Admin/AdminShowUsers"
import AdminOneUserShow from "./components/Admin/AdminOneUserShow"
import UserCategories from "./components/User/UserCategories"
import UserCategory from "./components/User/UserCategory";
import UserPackage from "./components/User/UserPackage";



export const appContext = createContext();

const App = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  useEffect(() => {
  const savedToken = localStorage.getItem("token");
  if (savedToken) {
    setToken(savedToken);
    setRole(localStorage.getItem("role"));
  }
}, []);

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
          {role === "ADMIN" && <Route path="/admin/categories" element={<AdminCategories/>}/>}
          {role === "ADMIN" && <Route path="/admin/category/:id" element={<AdminCategory/>}/>}
          {role === "ADMIN" && <Route path="/admin/category/:id/update" element={<AdminCategoryUpdate/>}/>}
          {role === "ADMIN" && <Route path="/admin/addnewcategory" element={<AdminAddNewCategory/>}/>}
          <Route path="/admin/packages" element={<AdminPackages/>}/>
          <Route path="/admin/package/:id" element={<AdminPackage/>}/>
          <Route path="/admin/package/:id/update" element={<AdminPackageUpdate/>}/>
          <Route path="/admin/addnewpackage" element={<AdminAddNewPackage/>}/>
          <Route path="/admin/allusers" element={<AdminShowUsers/>}/>
          <Route path="/admin/user/:id" element={<AdminOneUserShow/>}/>
          <Route path="/user/categories" element={<UserCategories/>}/>
          <Route path="/user/category/:id" element = {<UserCategory/>}/>
          <Route path="/user/package/:id" element={<UserPackage/>}/>
          <Route path="/about" element={<About />} />
        </Routes>
      </appContext.Provider>
      {token && <button onClick={()=>{navigate(-1)}}>Back</button>}
    </div>
  );
};

export default App;
