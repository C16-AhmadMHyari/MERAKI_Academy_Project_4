import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPackage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imgInfo, setImgInfo] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/packages/${id}`, {
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

  const deletePackage = () => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      axios
        .delete(`http://localhost:5000/packages/delete/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response);
          navigate("/admin/packages");
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
          <h2>Package Details</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => navigate(`/admin/package/${id}/update`)}
              style={{ backgroundColor: "#4a90e2" }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={deletePackage}
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

        {imgInfo.urgent && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px 15px",
              backgroundColor: "#ffe5e5",
              border: "1px solid #ff4444",
              borderRadius: "5px",
              color: "#cc0000",
              fontWeight: "500",
            }}
          >
            🚨 Urgent Campaign
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPackage;
