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
    <div className="container">
      <div>
        <h1>🚨 Urgent Campaigns</h1>
        <p>
          These campaigns need your immediate support
        </p>
      </div>

      {urgents.length > 0 ? (
        <div>
          {urgents.map((urgent) => (
            <div
              key={urgent._id}
              className="card"
              onClick={() => navigate(`/user/package/${urgent._id}`)}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(255,68,68,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
              }}>
              <div>
                <img
                  src={urgent.imgSource}
                  alt={urgent.title} />
                <div>
                  🚨 URGENT
                </div>
              </div>

              <h3>{urgent.title}</h3>
              <p>
                {urgent.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="card">
          <span>
            ✅
          </span>
          <h2>
            No Urgent Campaigns
          </h2>
          <p>
            All campaigns are currently stable. Check back later!
          </p>
        </div>
      )}
    </div>
  );
};

export default UrgentCampaigns;
