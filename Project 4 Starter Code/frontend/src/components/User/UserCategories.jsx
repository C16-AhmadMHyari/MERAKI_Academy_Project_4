import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((result) => setCategories(result.data.result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>
        <h2>The main areas we focus on supporting</h2> 
      </div>
      <>
        {categories.map((category) => {
          return (
            <div className="image-box" key={category._id}>
              <img
                src={category.imgSource}
                onClick={() => {
                  navigate(`/user/category/${category._id}`);
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
  );
};
export default UserCategories;