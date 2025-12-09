import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNewPackage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSource, setImgsource] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [active, setActivity] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((result) => setCategories(result.data.result))
      .catch((err) => console.log(err));
  }, []);

  const confirmAdding = () => {
    const newPackage = {
      title: title,
      description: description,
      imgSource: imgSource,
      urgent: urgent,
      Active: active,
      category: categoryId,
    };

    axios
      .post("http://localhost:5000/packages/addpackage", newPackage, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        navigate("/admin/packages");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "30px", textAlign: "center" }}>
          Add New Package
        </h1>

        {imgSource && (
          <img
            src={imgSource}
            alt="Package preview"
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
            placeholder="Enter package title"
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
            placeholder="Write a description about the new package"
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

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#333" }}
          >
            Image URL
          </label>
          <input
            type="text"
            placeholder="Put link of image that represents the package"
            onChange={(e) => setImgsource(e.target.value)}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#333" }}
          >
            Category
          </label>
          <select
            onChange={(e) => setCategoryId(e.target.value)}
            style={{ width: "100%", maxWidth: "100%" }}
          >
            <option value="">Choose a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#333" }}
          >
            Is it Urgent?
          </label>
          <select
            onChange={(e) => setUrgent(e.target.value === "true")}
            style={{ width: "100%", maxWidth: "100%" }}
          >
            <option value="">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#333" }}
          >
            Active Immediately?
          </label>
          <select
            onChange={(e) => setActivity(e.target.value === "true")}
            style={{ width: "100%", maxWidth: "100%" }}
          >
            <option value="">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={confirmAdding}
            style={{ flex: 1, backgroundColor: "#4a90e2" }}
          >
            ➕ Add Package
          </button>
          <button
            onClick={() => navigate("/admin/packages")}
            style={{ flex: 1, backgroundColor: "#95a5a6" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewPackage;
