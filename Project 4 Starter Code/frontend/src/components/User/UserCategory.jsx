import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imgInfo, setImgInfo] = useState({});
  const [packages, setPackages] = useState([]);

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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/packages`)
      .then((response) => {
        const wantedPackages = response.data.result.filter((element) => {
          return element.category._id == id;
        });
        setPackages(wantedPackages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>{imgInfo.title}</h2>
      <p>{imgInfo.description}</p>
      <div>
        {packages.map((element) => {
          return (
            <div key={element._id}>
              {" "}
              <img src={element.imgSource} onClick={()=>{navigate(`/user/package/${id}`)}} />
              <br />
              <h4>{element.title}</h4>
              <p>{element.description}</p><br />
            </div>
          );
        })}
      </div>
      {/* <img src={imgInfo.imgSource} /> */}
    </div>
  );
};
export default UserCategory;
