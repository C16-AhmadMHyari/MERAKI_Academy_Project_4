import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imgInfo, setImgInfo] = useState({});
  const [packages,setPackage] = useState([])

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
        console.log({ full: err });
      });
  }, []);

  useEffect(()=>{
    axios.get(`http://localhost:5000/packages`).then((response)=>{console.log(response);
    })
  },[])
  

  return (
    <div>
      <h2>{imgInfo.title}</h2>
      <p>{imgInfo.description}</p>
      {/* <img src={imgInfo.imgSource} /> */}
      
    </div>
  );
};
export default UserCategory;
