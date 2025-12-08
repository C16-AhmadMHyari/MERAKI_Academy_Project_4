import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminCategory from "./AdminCategory";

const AdminCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((result) => setCategories(result.data.result))
      .catch((err) => console.log(err));
  }, []);

  return (categories.length > 0)? (
    <div>
      <div>
        <button onClick={()=>{navigate("/admin/addnewcategory")}}>Add New Category</button>
      </div>
      <>
        {categories.map((category, i) => {
          return (
            <div className="image-box" key={category._id}>
              <img
                src={category.imgSource}
                onClick={() => {
                  navigate(`/admin/category/${category._id}`);
                }}
              />
              <br />
              {category.title} <br />
              {category.description}
            </div>
          );
        })}
      </>
    </div>
  ):
  (
    <div>
      <button onClick={()=>{navigate("/admin/addnewcategory")}}>Add New Category</button><br />
      <h1>There is no categories</h1>
    </div>
  )
};
export default AdminCategories;
