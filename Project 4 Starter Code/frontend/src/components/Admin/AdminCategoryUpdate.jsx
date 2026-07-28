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
      <div className="card">
        <h1>
          Update Category
        </h1>

        {imgSource && (
          <img
            src={imgSource}
            alt="Category preview" />
        )}

        <div>
          <label>
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label>
            Image URL
          </label>
          <input
            type="text"
            value={imgSource}
            onChange={(e) => setImgSource(e.target.value)} />
        </div>

        <div>
          <button
            onClick={confirmUpdating}>
            ✅ Update Category
          </button>
          <button
            onClick={() => navigate(`/admin/category/${id}`)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
