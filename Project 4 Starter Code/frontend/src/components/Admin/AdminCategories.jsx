import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((result) => setCategories(result.data.result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
        <div><button>Add New Category</button></div>
      <>
        {categories.map((category, i) => {
          return (
            <div className="image-box" key={category._id}>
              <img src={category.imgSource} />
              <br />
              {category.title} <br />
              {category.description}
            </div>
          );
        })}
      </>
    </div>
  );
};
export default AdminCategories;
