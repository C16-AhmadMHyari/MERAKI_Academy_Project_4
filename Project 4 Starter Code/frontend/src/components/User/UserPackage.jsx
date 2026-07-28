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
      <div className="card">
        {thisPackage.urgent && (
          <div>
            🚨 Urgent Campaign
          </div>
        )}

        <h2>
          {thisPackage.title}
        </h2>

        <img
          src={thisPackage.imgSource}
          alt={thisPackage.title} />

        <p>
          {thisPackage.description}
        </p>

        <div>
          <label>
            Enter Donation Amount
          </label>
          <input
            type="number"
            placeholder="Enter amount (minimum $1)"
            onChange={(e) => setAmount(Number(e.target.value))}
            min="1" />

          {amount>= 1 && (
            <button
              onClick={saveToChart}>
              🛒 Add ${amount} to Cart
            </button>
          )}

          {amount > 0 && amount < 1 && (
            <p>
              Minimum donation amount is $1
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPackage;
