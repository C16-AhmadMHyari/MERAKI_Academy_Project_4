import React from "react";
import { Routes,Route,Link,useNavigate } from "react-router-dom";
import Categories from "../shared components/Categories";

const AdminPanel = ()=>{
  const navigate = useNavigate();
return (
    <div>
        <h1>Admin Panel</h1>
        <div style={{display:"flex"}}>
        <button onClick={()=>{navigate("/admin/categories")}}>Edit Categories</button>
        <button onClick={()=>{navigate("/admin/packages")}}>Edit Packages</button>
        <button onClick={()=>{navigate("/admin/allusers")}}>Edit Users</button>
        <button>Reports</button>
        </div>
    </div>
)
}
export default AdminPanel