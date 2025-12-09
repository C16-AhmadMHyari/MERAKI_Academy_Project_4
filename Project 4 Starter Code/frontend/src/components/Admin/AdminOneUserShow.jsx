import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminShowUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 5;

  useEffect(() => {
    axios
      .post(
        `http://localhost:5000/users/user/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setUser(response.data.user);
        setDonations(response.data.donations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(
    indexOfFirstDonation,
    indexOfLastDonation
  );

  const totalPages = Math.ceil(donations.length / donationsPerPage);

  if (!user)
    return (
      <div className="container">
        <div className="card" style={{ textAlign: "center", padding: "40px" }}>
          <h2>Loading...</h2>
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>User Information</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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

      <div className="card">
        <h2 style={{ marginBottom: "20px" }}>Donations History</h2>
        {currentDonations.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <span
              style={{
                fontSize: "48px",
                marginBottom: "15px",
                display: "block",
              }}
            >
              💰
            </span>
            <p style={{ color: "#999", fontSize: "18px" }}>No donations yet</p>
          </div>
        ) : (
          <div>
            {currentDonations.map((donation) => (
              <div
                key={donation._id}
                style={{
                  padding: "15px",
                  marginBottom: "15px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "5px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "10px",
                  }}
                >
                  <div>
                    <strong style={{ color: "#4a90e2" }}>Package:</strong>{" "}
                    <span style={{ color: "#333" }}>
                      {donation.package?.title || "N/A"}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: "#4a90e2" }}>Category:</strong>{" "}
                    <span style={{ color: "#333" }}>
                      {donation.category?.name || "N/A"}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: "#4a90e2" }}>Amount:</strong>{" "}
                    <span style={{ color: "#27ae60", fontWeight: "600" }}>
                      ${donation.amount}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: "#4a90e2" }}>Date:</strong>{" "}
                    <span style={{ color: "#333" }}>
                      {new Date(donation.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              marginTop: "20px",
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
    </div>
  );
};

export default AdminShowUser;
