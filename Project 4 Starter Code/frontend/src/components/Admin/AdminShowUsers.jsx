import axios from "axios";
import { useEffect, useState } from "react";

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/allusers`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Users</h2>
    </div>
  );
};

export default ShowUsers;
