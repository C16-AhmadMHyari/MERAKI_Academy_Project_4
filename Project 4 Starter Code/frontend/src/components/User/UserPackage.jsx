import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserPackage = () => {
  const { id } = useParams();
  const [thisPackage, setThisPackage] = useState([]);
  const [amount, setAmount] = useState(0);
  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem("donations");
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
      userId: localStorage.getItem("userId"),
      amount: amount,
      package: thisPackage._id,
      category: thisPackage.category._id,
    };
    const updatedDonations = [...donations, newDonate];
    setDonations(updatedDonations);
    localStorage.setItem("donations", JSON.stringify(updatedDonations));
  };
  return (
    <div>
      <h3>{thisPackage.title}</h3>
      <img src={thisPackage.imgSource} />
      <p>{thisPackage.description}</p>
      <br />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      /><br/>
      {amount >= 1 && <button onClick={saveToChart}>Add to cart</button>}
    </div>
  );
};
export default UserPackage;
