import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPackages = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/packages/")
      .then((result) => setPackages(result.data.result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>
        {/* onClick={()=>{navigate("/admin/addnewcategory")}} */}
        <button >Add New Package</button>
      </div>
      <>
        {packages.map((Package, i) => {
          return (
            <div className="image-box" key={Package._id}>
              <img
                src={Package.imgSource}
                onClick={() => {
                  navigate(`/admin/package/${Package._id}`);
                }}
              />
              <br />
              {Package.title} <br />
              {Package.description}
            </div>
          );
        })}
      </>
    </div>
  );
};
export default AdminPackages
