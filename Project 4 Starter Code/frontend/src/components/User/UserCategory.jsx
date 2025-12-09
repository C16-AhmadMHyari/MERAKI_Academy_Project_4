import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imgInfo, setImgInfo] = useState({});
  const [packages, setPackages] = useState([]);

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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/packages`)
      .then((response) => {
        const wantedPackages = response.data.result.filter((element) => {
          return element.category._id == id;
        });
        setPackages(wantedPackages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div
        className="card"
        style={{ marginBottom: "30px", textAlign: "center" }}
      >
        <h1 style={{ marginBottom: "15px" }}>{imgInfo.title}</h1>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.6" }}>
          {imgInfo.description}
        </p>
      </div>

      {packages.length > 0 ? (
        <div>
          <h2 style={{ marginBottom: "20px" }}>Available Campaigns</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {packages.map((element) => (
              <div
                key={element._id}
                className="card"
                onClick={() => navigate(`/user/package/${element._id}`)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={element.imgSource}
                  alt={element.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "5px",
                    marginBottom: "15px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <h4 style={{ marginBottom: "10px" }}>{element.title}</h4>
                <p style={{ color: "#666", fontSize: "14px" }}>
                  {element.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="card"
          style={{ textAlign: "center", padding: "60px 20px" }}
        >
          <span
            style={{ fontSize: "64px", marginBottom: "20px", display: "block" }}
          >
            📦
          </span>
          <h2 style={{ color: "#999", marginBottom: "20px" }}>
            No Campaigns Available
          </h2>
          <p style={{ color: "#666" }}>
            Check back later for campaigns in this category
          </p>
        </div>
      )}
    </div>
  );
};

export default UserCategory;
