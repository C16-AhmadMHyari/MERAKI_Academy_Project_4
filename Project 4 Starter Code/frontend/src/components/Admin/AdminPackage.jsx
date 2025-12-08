import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPackage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imgInfo, setImgInfo] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/packages/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setImgInfo(response.data.result);
      })
      .catch((err) => {
        console.log({ full: err });
      });
  }, []);

  const deletePackage = ()=>{
    axios.delete(`http://localhost:5000/packages/delete/${id}`,{
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
    .then((response)=>{console.log(response);
      navigate("/admin/packages")
    }).catch((err)=>{console.log(err);
    })
  }

  return (
    <div>
      <h2>Admin Page</h2>
      <button onClick={()=>{navigate(`/admin/package/${id}/update`)}}>Edit</button>
      <button onClick={deletePackage}>Delete</button>
      <br />
      <h3>{imgInfo.title}</h3>
      <img src={imgInfo.imgSource} />
      <p>{imgInfo.description}</p>
    </div>
  );
};
export default AdminPackage;
