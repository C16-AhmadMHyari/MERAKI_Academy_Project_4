import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imgInfo, setImgInfo] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/categories/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setImgInfo(response.data.result);
      })
      .catch((err) => {
        console.log({ full: err, erro1: 1 });
      });
  }, []);

  const deleteThisCategory = () => {
    axios.delete(`http://localhost:5000/categories/${id}/delete`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response)=>{console.log(response);
    }).catch((err)=>{console.log(err);
    })
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <button
        onClick={() => {
          navigate(`/admin/category/${id}/update`);
        }}
      >
        Edit
      </button>
      <button onClick={()=>{deleteThisCategory()
        navigate("/admin/categories")
      }}>Delete</button>
      <br />
      <h3>{imgInfo.title}</h3>
      <img src={imgInfo.imgSource} />
      <p>{imgInfo.description}</p>
    </div>
  );
};
export default AdminCategory;
