import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const addnewpackage = () => {
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
    <div>
      <h1>Add New Package</h1>
      Title
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      Write a description about the new package
      <input
        type="text"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      Put link of image that represents the new package
      <input
        type="text"
        onChange={(e) => {
          setImgsource(e.target.value);
        }}
      />
      <br />
      Is it Urgent{" "}
      <select
        onChange={(e) => {
          setUrgent(e.target.value === "true");
        }}
      >
        <option value=""></option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <br />
      {/* //================ */}
      Choose Category
      <select onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Choose here</option>
        {categories.map((cat, i) => (
          <option key={cat._id} value={cat._id}>
            {cat.title}
          </option>
        ))}
      </select>
      {/* //================ */}
      <br />
      Do you want it to be Active Directly ?
      <select
        onChange={(e) => {
          setActivity(e.target.value === "true");
        }}
      >
        <option value=""></option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <br />
      <button onClick={confirmAdding}>Add</button>
    </div>
  );
};
export default addnewpackage;
