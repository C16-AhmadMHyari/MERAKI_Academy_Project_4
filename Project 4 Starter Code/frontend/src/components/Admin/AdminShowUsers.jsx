import { useState } from "react";

const ShowUsers = () => {
  const [users, setUsers] = useState([]);

  axios.get(`http://localhost:5000/users/allusers`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
