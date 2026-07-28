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
      <h1>🛒 My Cart</h1>

      {chart.length === 0 ? (
        <div
          className="card">
          <span>
            🛒
          </span>
          <h2>
            Your Cart is Empty
          </h2>
          <p>
            Add donations to your cart to continue
          </p>
          <button onClick={() => navigate("/user/categories")}>
            Browse Categories
          </button>
        </div>
      ) : (
        <>
          <div>
            {chart.map((donation, i) => (
              <div
                key={i}
                className="card">
                <img
                  src={donation.imgSource}
                  alt={donation.packageName} />

                <div>
                  <h3>
                    {donation.packageName}
                  </h3>
                  <p>
                    <strong>Category:</strong > {donation.categoryName}
                  </p>
                  <p>
                    ${donation.amount}
                  </p>
                </div>

                <button
                  onClick={() => removeDonation(i)}>
                  🗑️ Remove
                </button>
              </div>
            ))}
          </div>

          <div
            className="card">
            <div>
              <h2>Total Amount:</h2>
              <h2>
                ${totalAmount.toFixed(2)}
              </h2>
            </div>
            <p>
              {chart.length} donation{chart.length > 1 ? "s" : ""} in cart
            </p>
          </div>

          <button
            onClick={complete}>
            ✅ Complete and Process Donations
          </button>
        </>
      )}
    </div>
  );
};

export default UserChart;
