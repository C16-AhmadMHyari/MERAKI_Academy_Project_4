import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const addnewpackage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSource, setImgsource] = useState("");
  const [urgent,setUrgent] = useState(false)
  const [active,setActivity] = useState(false)
  const[category,setCategory] = useState('')

  const confirmAdding = () => {
    const newPackage = {
      title:title,
    description:description,
    imgSource:imgSource,
    urgent:urgent,
    Active:active,
    category:category,
    };

    axios
      .post("http://localhost:5000/packages/addpackage", newPackage, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {navigate("/admin/packages")})
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
      
      <button onClick={confirmAdding}>Add</button>
    </div>
  );
};
export default addnewpackage
