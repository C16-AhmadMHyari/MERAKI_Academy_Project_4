import React from "react";
import { Routes,Route,Link,useNavigate } from "react-router-dom";
import Categories from "../shared components/Categories";

const AdminPanel = ()=>{
  const navigate = useNavigate();
return (
    <div>
        <h1>Admin Panel</h1>
        <div style={{display:"flex"}}>
        <button onClick={()=>{navigate("/categories")}}>Edit Categories</button>
        <button>Edit Packages</button>
        <button>Edit Users</button>
        <button>Reports</button>
        </div>
    </div>
)
}
export default AdminPanel