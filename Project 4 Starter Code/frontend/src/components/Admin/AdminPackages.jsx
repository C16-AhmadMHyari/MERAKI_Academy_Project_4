import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPackages = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/packages")
      .then((result) => setPackages(result.data.result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>
        <button>Add New Package</button>
      </div>
      <>
        {packages.map((element, i) => {
          return (
            <div className="image-box" key={element._id}>
              <img
                src={element.imgSource}
                onClick={() => {
                  navigate(`/admin/package/${element._id}`);
                }}
              />
              <br />
              {element.title} <br />
              {element.description}
            </div>
          );
        })}
      </>
    </div>
  );
};
export default AdminPackages;
