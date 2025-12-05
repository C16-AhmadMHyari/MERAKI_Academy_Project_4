import React, { useContext, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";

const AdminCategory = () => {
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/categories/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log({"full": err,
            "erro1": 1
        });
      });
  }, []);

  return (
    <div>
      <h2>Admin Page</h2>
      <h3></h3>
    </div>
  );
};
export default AdminCategory;
