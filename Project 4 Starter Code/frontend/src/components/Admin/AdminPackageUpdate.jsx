import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AdminPackageUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSource, setImgSource] = useState("");
  const [urgent, setUrgent] = useState(null);
  const [active, setActivity] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((result) => setCategories(result.data.result))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/packages/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setTitle(result.data.result.title);
        setDescription(result.data.result.description);
        setImgSource(result.data.result.imgSource);
        setUrgent(result.data.result.urgent);
        setActivity(result.data.result.Active);
        setCategoryId(result.data.result.category);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const confirmUpdating = () => {
    axios
      .put(
        `http://localhost:5000/packages/update/${id}`,
        {
          title: title,
          description: description,
          imgSource: imgSource,
          urgent: urgent,
          Active: active,
          category: categoryId,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        navigate(`/admin/package/${id}`);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "30px", textAlign: "center" }}>
          Update Package
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

        <div style={{ marginBottom: "15px" }}>
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

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#333" }}
          >
            Category
          </label>
          <select
            value={categoryId}
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
            value={urgent ? "true" : "false"}
            onChange={(e) => setUrgent(e.target.value === "true")}
            style={{ width: "100%", maxWidth: "100%" }}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#333" }}
          >
            Active Status
          </label>
          <select
            value={active ? "true" : "false"}
            onChange={(e) => setActivity(e.target.value === "true")}
            style={{ width: "100%", maxWidth: "100%" }}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={confirmUpdating}
            style={{ flex: 1, backgroundColor: "#4a90e2" }}
          >
            ✅ Update Package
          </button>
          <button
            onClick={() => navigate(`/admin/package/${id}`)}
            style={{ flex: 1, backgroundColor: "#95a5a6" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPackageUpdate;
