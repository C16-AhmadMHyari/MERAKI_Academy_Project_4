import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNewCategory = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSource, setImgsource] = useState("");

  const confirmAdding = () => {
    const newCategory = {
      title: title,
      description: description,
      imgSource: imgSource,
    };

    axios
      .post("http://localhost:5000/categories/addCategory", newCategory, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        navigate("/admin/categories");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "30px", textAlign: "center" }}>
          Add New Category
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
            placeholder="Enter category title"
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
            placeholder="Write a description about the new category"
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
            placeholder="Put link of image that represents the category"
            onChange={(e) => setImgsource(e.target.value)}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={confirmAdding}
            style={{ flex: 1, backgroundColor: "#4a90e2" }}
          >
            ➕ Add Category
          </button>
          <button
            onClick={() => navigate("/admin/categories")}
            style={{ flex: 1, backgroundColor: "#95a5a6" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewCategory;
