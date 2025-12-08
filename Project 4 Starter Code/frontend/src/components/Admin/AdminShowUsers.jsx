import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
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
      <div>
        {users.map((user) => {
          if(user.firstName === "Admin"){return <></>}else{
          return (
            <div
              key={user._id}
              onClick={() => {
                navigate(`/admin/user/:id`);
              }}
            >{`${user.firstName} ${user.lastName} ${user.email} ${user.phoneNumber} ${user.country}`}</div>
          )};
        })}
      </div>
    </div>
  );
};

export default ShowUsers;
