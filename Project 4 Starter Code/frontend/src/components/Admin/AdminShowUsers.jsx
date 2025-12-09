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
      <h1 style={{ marginBottom: "30px" }}>Manage Users</h1>

      {currentUsers.length > 0 ? (
        <div style={{ marginBottom: "30px" }}>
          {currentUsers.map((user) => (
            <div
              key={user._id}
              className="card"
              onClick={() => navigate(`/admin/user/${user._id}`)}
              style={{
                cursor: "pointer",
                marginBottom: "15px",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(5px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "15px",
                }}
              >
                <div>
                  <strong style={{ color: "#4a90e2" }}>Name:</strong>{" "}
                  <span style={{ color: "#333" }}>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <div>
                  <strong style={{ color: "#4a90e2" }}>Email:</strong>{" "}
                  <span style={{ color: "#333" }}>{user.email}</span>
                </div>
                <div>
                  <strong style={{ color: "#4a90e2" }}>Phone:</strong>{" "}
                  <span style={{ color: "#333" }}>{user.phoneNumber}</span>
                </div>
                <div>
                  <strong style={{ color: "#4a90e2" }}>Country:</strong>{" "}
                  <span style={{ color: "#333" }}>{user.country}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="card"
          style={{ textAlign: "center", padding: "60px 20px" }}
        >
          <span
            style={{ fontSize: "64px", marginBottom: "20px", display: "block" }}
          >
            👥
          </span>
          <h2 style={{ color: "#999" }}>No Users Found</h2>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ← Previous
          </button>
          <span style={{ color: "#666", fontSize: "16px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowUsers;
