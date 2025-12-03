import React from "react";

const AdminPanel = ()=>{
return (
    <div>
        <h1>Admin Panel</h1>
        <div style={{display:"flex"}}>
        <button>Edit Categories</button>
        <button>Edit Packages</button>
        <button>Edit Users</button>
        <button>Reports</button>
        </div>
    </div>
)
}
export default AdminPanel