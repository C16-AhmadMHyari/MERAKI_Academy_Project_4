import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserPackage = () => {
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
        // console.log(response.data.result);
        
        setThisPackage(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveToChart = () => {
    const newDonate = {
      packageName:thisPackage.title,
      categoryName:thisPackage.category.title,
      userId: localStorage.getItem("userId"),
      amount: amount,
      package: thisPackage._id,
      category: thisPackage.category._id,
      imgSource:thisPackage.imgSource
    };
    const updatedChart = [...chart, newDonate];
    setChart(updatedChart);
    localStorage.setItem("Chart", JSON.stringify(updatedChart));
  };
  return (
    <div>
      <h3>{thisPackage.title}</h3>
      <img src={thisPackage.imgSource} />
      <p>{thisPackage.description}</p>
      <br />
      <input
        type="number"
        placeholder="Enter Value here"
        onChange={(e) => setAmount(Number(e.target.value))}
      /><br/>
      {amount >= 1 && <button onClick={saveToChart}>Add to cart</button>}
    </div>
  );
};
export default UserPackage;
