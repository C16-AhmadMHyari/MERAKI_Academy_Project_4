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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h2>Category Details</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => navigate(`/admin/category/${id}/update`)}
              style={{ backgroundColor: "#4a90e2" }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={deleteThisCategory}
              style={{ backgroundColor: "#e74c3c" }}
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        <img
          src={imgInfo.imgSource}
          alt={imgInfo.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: "5px",
            marginBottom: "20px",
            backgroundColor: "#f5f5f5",
          }}
        />

        <h3 style={{ marginBottom: "15px" }}>{imgInfo.title}</h3>
        <p style={{ color: "#666", lineHeight: "1.6" }}>
          {imgInfo.description}
        </p>
      </div>
    </div>
  );
};

export default AdminCategory;
