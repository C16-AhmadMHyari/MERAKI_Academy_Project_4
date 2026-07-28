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
      <div className="card">
        <h1>
          Add New Category
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
            placeholder="Enter category title"
            onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label>
            Description
          </label>
          <textarea
            placeholder="Write a description about the new category"
            onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label>
            Image URL
          </label>
          <input
            type="text"
            placeholder="Put link of image that represents the category"
            onChange={(e) => setImgsource(e.target.value)} />
        </div>

        <div>
          <button
            onClick={confirmAdding}>
            ➕ Add Category
          </button>
          <button
            onClick={() => navigate("/admin/categories")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewCategory;
