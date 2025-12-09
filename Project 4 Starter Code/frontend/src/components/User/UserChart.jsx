import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserChart = () => {
  const navigate = useNavigate();
  const [chart, setChart] = useState(() => {
    const saved = localStorage.getItem("Chart");
    return saved ? JSON.parse(saved) : [];
  });

  const complete = async () => {
    try {
      for (let donation of chart) {
        await axios.post(
          "http://localhost:5000/users/donate",
          {
            user: donation.userId,
            category: donation.categoryId,
            package: donation.packageId,
            amount: donation.amount,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      localStorage.removeItem("Chart");
      setChart([]);
      alert("Thank you! Your donations have been processed successfully.");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("There was an error processing your donations. Please try again.");
    }
  };

  const removeDonation = (index) => {
    const updatedChart = chart.filter((_, i) => i !== index);
    setChart(updatedChart);
    localStorage.setItem("Chart", JSON.stringify(updatedChart));
  };

  const totalAmount = chart.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div className="container">
      <h1 style={{ marginBottom: "30px" }}>🛒 My Cart</h1>

      {chart.length === 0 ? (
        <div
          className="card"
          style={{ textAlign: "center", padding: "60px 20px" }}
        >
          <span
            style={{ fontSize: "64px", marginBottom: "20px", display: "block" }}
          >
            🛒
          </span>
          <h2 style={{ color: "#999", marginBottom: "20px" }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: "#666", marginBottom: "30px" }}>
            Add donations to your cart to continue
          </p>
          <button onClick={() => navigate("/user/categories")}>
            Browse Categories
          </button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            {chart.map((donation, i) => (
              <div
                key={i}
                className="card"
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img
                  src={donation.imgSource}
                  alt={donation.packageName}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "contain",
                    borderRadius: "5px",
                    backgroundColor: "#f5f5f5",
                    flexShrink: 0,
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: "10px" }}>
                    {donation.packageName}
                  </h3>
                  <p style={{ color: "#666", marginBottom: "10px" }}>
                    <strong>Category:</strong> {donation.categoryName}
                  </p>
                  <p
                    style={{
                      color: "#27ae60",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    ${donation.amount}
                  </p>
                </div>

                <button
                  onClick={() => removeDonation(i)}
                  style={{
                    backgroundColor: "#e74c3c",
                    padding: "10px 20px",
                  }}
                >
                  🗑️ Remove
                </button>
              </div>
            ))}
          </div>

          <div
            className="card"
            style={{
              backgroundColor: "#e8f4f8",
              padding: "30px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: "#4a90e2" }}>Total Amount:</h2>
              <h2 style={{ color: "#27ae60", fontSize: "32px" }}>
                ${totalAmount.toFixed(2)}
              </h2>
            </div>
            <p
              style={{ color: "#666", marginTop: "10px", textAlign: "center" }}
            >
              {chart.length} donation{chart.length > 1 ? "s" : ""} in cart
            </p>
          </div>

          <button
            onClick={complete}
            style={{
              width: "100%",
              padding: "20px",
              fontSize: "20px",
              backgroundColor: "#27ae60",
            }}
          >
            ✅ Complete and Process Donations
          </button>
        </>
      )}
    </div>
  );
};

export default UserChart;
