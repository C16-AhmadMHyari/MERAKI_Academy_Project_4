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
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ marginBottom: "15px" }}>🚨 Urgent Campaigns</h1>
        <p style={{ color: "#666", fontSize: "18px" }}>
          These campaigns need your immediate support
        </p>
      </div>

      {urgents.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {urgents.map((urgent) => (
            <div
              key={urgent._id}
              className="card"
              onClick={() => navigate(`/user/package/${urgent._id}`)}
              style={{
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                border: "2px solid #ff4444",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(255,68,68,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{
                  position: "relative",
                  marginBottom: "15px",
                }}
              >
                <img
                  src={urgent.imgSource}
                  alt={urgent.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "5px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#ff4444",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontWeight: "600",
                    fontSize: "12px",
                  }}
                >
                  🚨 URGENT
                </div>
              </div>

              <h3 style={{ marginBottom: "10px" }}>{urgent.title}</h3>
              <p style={{ color: "#666", fontSize: "14px" }}>
                {urgent.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="card"
          style={{ textAlign: "center", padding: "60px 20px" }}
        >
          <span
            style={{ fontSize: "64px", marginBottom: "20px", display: "block" }}
          >
            ✅
          </span>
          <h2 style={{ color: "#999", marginBottom: "20px" }}>
            No Urgent Campaigns
          </h2>
          <p style={{ color: "#666" }}>
            All campaigns are currently stable. Check back later!
          </p>
        </div>
      )}
    </div>
  );
};

export default UrgentCampaigns;
