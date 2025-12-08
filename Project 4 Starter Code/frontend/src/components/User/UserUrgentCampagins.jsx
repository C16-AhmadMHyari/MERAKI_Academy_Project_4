import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UrgentCampaigns = () => {
  const navigate = useNavigate();
  const [urgents, setUrgents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/packages")
      .then((response) => {
        const allPackages = response.data.result;
        const urgentPackages = allPackages.filter((elem) => {
          return elem.urgent == true;
        });
        setUrgents(urgentPackages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {urgents.map((urgent) => {
        return (
          <div key={urgent._id}>
            <img
              src={urgent.imgSource}
              onClick={() => {
                navigate(`/user/package/${urgent._id}`);
              }}
            />
            <br />
            <h3>{urgent.title}</h3>
            <br />
            <p>{urgent.description}</p>
          </div>
        );
      })}
    </div>
  );
};
export default UrgentCampaigns;
