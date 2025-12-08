import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserPackage = () => {
  const { id } = useParams();
  const [thisPackage, setThisPackage] = useState([]);
  const [amount, setAmount] = useState(0);

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
  return (
    <div>
      <h3>{thisPackage.title}</h3>
      <img src={thisPackage.imgSource} />
      <p>{thisPackage.description}</p>
      <br />
      <input
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setAmount(amount + 1);
        }}
      >
        +
      </button><br />
      {amount >= 1 && <button>Add to cart</button>}
    </div>
  );
};
export default UserPackage;
