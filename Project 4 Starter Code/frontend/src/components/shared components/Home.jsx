import React, { useEffect, useState } from "react";
import axios from "axios";

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
  return (
    <div>
      <div style={{ display: "grid" }}></div>
    </div>
  );
};

export default Home;
