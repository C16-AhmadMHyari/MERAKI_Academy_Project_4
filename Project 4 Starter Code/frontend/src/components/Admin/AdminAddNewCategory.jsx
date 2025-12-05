import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const addnewcategory = () => {
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
      .then((response) => {navigate('/admin/categories')})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Add New Field</h1>
      Title
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      Write a description about the new path
      <input
        type="text"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      Put link of image that represents the new field
      <input
        type="text"
        onChange={(e) => {
          setImgsource(e.target.value);
        }}
      />
      <br />
      <button onClick={confirmAdding}>Add</button>
    </div>
  );
};
export default addnewcategory;
