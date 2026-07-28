import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminCategory = () => {
  const navigate = useNavigate();
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
        console.log({ full: err });
      });
  }, []);

  const deleteThisCategory = () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      axios
        .delete(`http://localhost:5000/categories/${id}/delete`, {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          navigate("/admin/categories");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div>
          <h2>Category Details</h2>
          <div>
            <button
              onClick={() => navigate(`/admin/category/${id}/update`)}>
              ✏️ Edit
            </button>
            <button
              onClick={deleteThisCategory}>
              🗑️ Delete
            </button>
          </div>
        </div>

        <img
          src={imgInfo.imgSource}
          alt={imgInfo.title} />

        <h3>{imgInfo.title}</h3>
        <p>
          {imgInfo.description}
        </p>
      </div>
    </div>
  );
};

export default AdminCategory;
