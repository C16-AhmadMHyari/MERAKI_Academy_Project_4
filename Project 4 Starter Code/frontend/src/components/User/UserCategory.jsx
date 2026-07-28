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
    <div className="container">
      <div
        className="card">
        <h1>{imgInfo.title}</h1>
        <p>
          {imgInfo.description}
        </p>
      </div>

      {packages.length > 0 ? (
        <div>
          <h2>Available Campaigns</h2>
          <div>
            {packages.map((element) => (
              <div
                key={element._id}
                className="card"
                onClick={() => navigate(`/user/package/${element._id}`)}

                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
                }}>
                <img
                  src={element.imgSource}
                  alt={element.title} />
                <h4>{element.title}</h4>
                <p>
                  {element.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="card">
          <span>
            📦
          </span>
          <h2>
            No Campaigns Available
          </h2>
          <p>
            Check back later for campaigns in this category
          </p>
        </div>
      )}
    </div>
  );
};

export default UserCategory;
