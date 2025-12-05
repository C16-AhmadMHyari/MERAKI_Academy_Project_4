import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";

const AdminCategory = () => {
  const { id } = useParams();
  const [imgInfo, setImgInfo] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/categories/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setImgInfo(response.data.result);
      })
      .catch((err) => {
        console.log({ full: err, erro1: 1 });
      });
  }, []);

  return (
    <div>
      <h2>Admin Page</h2>
      <button>Edit</button>
      <button>Delete</button><br />
      <h3>{imgInfo.title}</h3>
    </div>
  );
};
export default AdminCategory;
