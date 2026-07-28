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
      <div className="card">
        <h1>
          Update Package
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
          <label>
            Category
          </label>
          <select
            value={categoryId}
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
            value={urgent ? "true" : "false"}
            onChange={(e) => setUrgent(e.target.value === "true")}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <label>
            Active Status
          </label>
          <select
            value={active ? "true" : "false"}
            onChange={(e) => setActivity(e.target.value === "true")}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <button
            onClick={confirmUpdating}>
            ✅ Update Package
          </button>
          <button
            onClick={() => navigate(`/admin/package/${id}`)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPackageUpdate;
