import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserPackage = () => {
  const { id } = useParams();
  const [thisPackage, setThisPackage] = useState([]);
console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/packages/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>hello world</div>;
};
export default UserPackage;
