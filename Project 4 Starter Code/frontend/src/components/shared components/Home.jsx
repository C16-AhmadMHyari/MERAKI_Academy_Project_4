import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [urgentCampagins, setUrgentCampagins] = useState([]);
  useEffect(() => {
    let getUregnts = async () => {
      try {
        const result = await axios.get("http://localhost:5000/packages/");
        const allCampagins = result.data.result;
        const urgents = allCampagins.filter((elem) => elem.urgent === true);
        console.log(urgents);
        setUrgentCampagins(urgents);
      } catch (err) {
        console.log(err);
      }
    };
    getUregnts();
  }, []);

  const showUrgents = ()=>{
    return urgentCampagins.map((cam,i)=>{
      return <div key={cam._id} >
        <p>{cam.title}</p><br />
        <img src={cam.imgSource}/><br />
        <p>{cam.description}</p>
      </div>
    })
  }
  return (
    <div>
      <div style={{ display: "grid" }}>{showUrgents()}</div>
    </div>
  );
};

export default Home;
