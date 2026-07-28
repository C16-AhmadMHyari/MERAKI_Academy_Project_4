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
        <div>
          <h2>Package Details</h2>
          <div>
            <button
              onClick={() => navigate(`/admin/package/${id}/update`)}>
              ✏️ Edit
            </button>
            <button
              onClick={deletePackage}>
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

        {imgInfo.urgent && (
          <div>
            🚨 Urgent Campaign
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPackage;
