import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    .filter((user) => user.firstName !== "Admin")
    .slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(
    users.filter((user) => user.firstName !== "Admin").length / usersPerPage
  );

  return (
    <div className="container">
      <h1>Manage Users</h1>

      {currentUsers.length > 0 ? (
        <div>
          {currentUsers.map((user) => (
            <div
              key={user._id}
              className="card"
              onClick={() => navigate(`/admin/user/${user._id}`)}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(5px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
              }}>
              <div>
                <div>
                  <strong>Name:</strong>{" "}
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  <span>{user.email}</span>
                </div>
                <div>
                  <strong>Phone:</strong>{" "}
                  <span>{user.phoneNumber}</span>
                </div>
                <div>
                  <strong>Country:</strong>{" "}
                  <span>{user.country}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="card">
          <span>
            👥
          </span>
          <h2>No Users Found</h2>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}>
            ← Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowUsers;
