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
        <div className="card">
          <div>
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
              }} />
            <button onClick={confirmSearch}>Search</button>
          </div>
        </div>
      )}

      {hasSearched && searchResults.length === 0 ? (
        <div
          className="card">
          <span>
            🔍
          </span>
          <h2>
            No matching results found
          </h2>
          <p>
            Try searching with different keywords
          </p>
          <button
            onClick={() => {
              setSearchResults([]);
              setHasSearched(false);
              setSearchInput("");
            }}>
            Back to Home
          </button>
        </div>
      ) : searchResults.length > 0 ? (
        <div>
          <div>
            <button
              onClick={() => {
                setSearchResults([]);
                setHasSearched(false);
                setSearchInput("");
              }}>
              ← Back to Home
            </button>
          </div>
          <h2>Search Results:</h2>
          <div>
            {searchResults.map((pkg) => (
              <div
                key={pkg._id}
                className="card"
                onClick={() => navigate(`/user/package/${pkg._id}`)}

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
                  src={pkg.imgSource}
                  alt={pkg.title} />
                <h3>{pkg.title}</h3>
                <p>
                  {pkg.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Urgent Campaigns</h2>
          <div>
            {urgentCampaigns.map((cam) => (
              <div
                key={cam._id}
                className="card"
                onClick={() => navigate(`/user/package/${cam._id}`)}

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
                  src={cam.imgSource}
                  alt={cam.title} />
                <h3>{cam.title}</h3>
                <p>
                  {cam.description}
                </p>
              </div>
            ))}
          </div>

          <h2>All Categories</h2>
          <div>
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="card"
                onClick={() => navigate(`/user/category/${cat._id}`)}

                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
                }}>
                <h3>{cat.title}</h3>
                <p>
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
