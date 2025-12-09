import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSource, setImgSource] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/categories/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setTitle(response.data.result.title);
        setDescription(response.data.result.description);
        setImgSource(response.data.result.imgSource);
      })
      .catch((err) => {
        console.log({ full: err });
      });
  }, []);

  const confirmUpdating = () => {
    axios
      .put(
        `http://localhost:5000/categories/${id}/update`,
        { title: title, description: description, imgSource: imgSource },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        navigate(`/admin/category/${id}`);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "30px", textAlign: "center" }}>
          Update Category
        </h1>

        {imgSource && (
          <img
            src={imgSource}
            alt="Category preview"
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "contain",
              borderRadius: "5px",
              marginBottom: "20px",
              backgroundColor: "#f5f5f5",
            }}
          />
        )}

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#333" }}
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#333" }}
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "100%",
              minHeight: "100px",
              padding: "10px",
              border: "1px solid #4a90e2",
              borderRadius: "5px",
              fontSize: "16px",
              fontFamily: "Arial, sans-serif",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#333" }}
          >
            Image URL
          </label>
          <input
            type="text"
            value={imgSource}
            onChange={(e) => setImgSource(e.target.value)}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={confirmUpdating}
            style={{ flex: 1, backgroundColor: "#4a90e2" }}
          >
            ✅ Update Category
          </button>
          <button
            onClick={() => navigate(`/admin/category/${id}`)}
            style={{ flex: 1, backgroundColor: "#95a5a6" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
