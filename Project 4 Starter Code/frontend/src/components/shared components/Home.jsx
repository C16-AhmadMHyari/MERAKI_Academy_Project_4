import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [urgentCampaigns, setUrgentCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setSearchResults([]);
    setHasSearched(false);
    setSearchInput("");

    const getUrgents = async () => {
      try {
        const result = await axios.get("http://localhost:5000/packages/");
        const allCampaigns = result.data.result;
        const urgents = allCampaigns.filter((elem) => elem.urgent === true);
        setUrgentCampaigns(urgents);
      } catch (err) {
        console.log(err);
      }
    };

    const getCategories = async () => {
      try {
        const result = await axios.get("http://localhost:5000/categories/");
        setCategories(result.data.result);
      } catch (err) {
        console.log(err);
      }
    };

    getUrgents();
    getCategories();
  }, []);

  const confirmSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/packages/search?query=${searchInput}`
      );
      setSearchResults(response.data);
      setHasSearched(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {localStorage.getItem("role") === "USER" && (
        <div className="card" style={{ marginBottom: "30px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="🔍 Search for campaigns..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                if (e.target.value === "") {
                  setSearchResults([]);
                  setHasSearched(false);
                }
              }}
              style={{ flex: 1 }}
            />
            <button onClick={confirmSearch}>Search</button>
          </div>
        </div>
      )}

      {hasSearched && searchResults.length === 0 ? (
        <div
          className="card"
          style={{ textAlign: "center", padding: "60px 20px" }}
        >
          <span
            style={{ fontSize: "64px", marginBottom: "20px", display: "block" }}
          >
            🔍
          </span>
          <h2 style={{ color: "#999", marginBottom: "20px" }}>
            No matching results found
          </h2>
          <p style={{ color: "#666", marginBottom: "30px" }}>
            Try searching with different keywords
          </p>
          <button
            onClick={() => {
              setSearchResults([]);
              setHasSearched(false);
              setSearchInput("");
            }}
          >
            Back to Home
          </button>
        </div>
      ) : searchResults.length > 0 ? (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={() => {
                setSearchResults([]);
                setHasSearched(false);
                setSearchInput("");
              }}
            >
              ← Back to Home
            </button>
          </div>
          <h2 style={{ marginBottom: "20px" }}>Search Results:</h2>
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {searchResults.map((pkg) => (
              <div
                key={pkg._id}
                className="card"
                onClick={() => navigate(`/user/package/${pkg._id}`)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={pkg.imgSource}
                  alt={pkg.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "5px",
                    marginBottom: "15px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <h3 style={{ marginBottom: "10px" }}>{pkg.title}</h3>
                <p style={{ color: "#666", fontSize: "14px" }}>
                  {pkg.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 style={{ marginBottom: "20px" }}>Urgent Campaigns</h2>
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              marginBottom: "40px",
            }}
          >
            {urgentCampaigns.map((cam) => (
              <div
                key={cam._id}
                className="card"
                onClick={() => navigate(`/user/package/${cam._id}`)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={cam.imgSource}
                  alt={cam.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "5px",
                    marginBottom: "15px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <h3 style={{ marginBottom: "10px" }}>{cam.title}</h3>
                <p style={{ color: "#666", fontSize: "14px" }}>
                  {cam.description}
                </p>
              </div>
            ))}
          </div>

          <h2 style={{ marginBottom: "20px" }}>All Categories</h2>
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="card"
                onClick={() => navigate(`/user/category/${cat._id}`)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
                }}
              >
                <h3 style={{ marginBottom: "10px" }}>{cat.title}</h3>
                <p style={{ color: "#666", fontSize: "14px" }}>
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
