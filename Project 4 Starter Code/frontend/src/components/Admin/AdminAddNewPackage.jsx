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
      <div className="card">
        <h1>
          Add New Package
        </h1>

        {imgSource && (
          <img
            src={imgSource}
            alt="Package preview" />
        )}

        <div>
          <label>
            Title
          </label>
          <input
            type="text"
            placeholder="Enter package title"
            onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label>
            Description
          </label>
          <textarea
            placeholder="Write a description about the new package"
            onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label>
            Image URL
          </label>
          <input
            type="text"
            placeholder="Put link of image that represents the package"
            onChange={(e) => setImgsource(e.target.value)} />
        </div>

        <div>
          <label>
            Category
          </label>
          <select
            onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Choose a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>
            Is it Urgent?
          </label>
          <select
            onChange={(e) => setUrgent(e.target.value === "true")}>
            <option value="">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <label>
            Active Immediately?
          </label>
          <select
            onChange={(e) => setActivity(e.target.value === "true")}>
            <option value="">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <button
            onClick={confirmAdding}>
            ➕ Add Package
          </button>
          <button
            onClick={() => navigate("/admin/packages")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewPackage;
