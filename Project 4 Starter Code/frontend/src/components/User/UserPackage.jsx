import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserPackage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [thisPackage, setThisPackage] = useState({});
  const [amount, setAmount] = useState(0);
  const [chart, setChart] = useState(() => {
    const saved = localStorage.getItem("Chart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/packages/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setThisPackage(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveToChart = () => {
    const newDonate = {
      packageName: thisPackage.title,
      categoryName: thisPackage.category.title,
      userId: localStorage.getItem("userId"),
      amount: amount,
      packageId: thisPackage._id,
      categoryId: thisPackage.category._id,
      imgSource: thisPackage.imgSource,
    };
    const updatedChart = [...chart, newDonate];
    setChart(updatedChart);
    localStorage.setItem("Chart", JSON.stringify(updatedChart));
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        {thisPackage.urgent && (
          <div
            style={{
              marginBottom: "20px",
              padding: "10px 15px",
              backgroundColor: "#ffe5e5",
              border: "1px solid #ff4444",
              borderRadius: "5px",
              color: "#cc0000",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            🚨 Urgent Campaign
          </div>
        )}

        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          {thisPackage.title}
        </h2>

        <img
          src={thisPackage.imgSource}
          alt={thisPackage.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: "5px",
            marginBottom: "20px",
            backgroundColor: "#f5f5f5",
          }}
        />

        <p
          style={{
            color: "#666",
            lineHeight: "1.6",
            fontSize: "16px",
            marginBottom: "30px",
          }}
        >
          {thisPackage.description}
        </p>

        <div
          style={{
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
            border: "1px solid #e0e0e0",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              color: "#333",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Enter Donation Amount
          </label>
          <input
            type="number"
            placeholder="Enter amount (minimum $1)"
            onChange={(e) => setAmount(Number(e.target.value))}
            min="1"
            style={{
              width: "100%",
              maxWidth: "100%",
              padding: "12px",
              fontSize: "18px",
              marginBottom: "15px",
            }}
          />

          {amount >= 1 && (
            <button
              onClick={saveToChart}
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "18px",
                backgroundColor: "#27ae60",
              }}
            >
              🛒 Add ${amount} to Cart
            </button>
          )}

          {amount > 0 && amount < 1 && (
            <p
              style={{
                color: "#e74c3c",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Minimum donation amount is $1
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPackage;
