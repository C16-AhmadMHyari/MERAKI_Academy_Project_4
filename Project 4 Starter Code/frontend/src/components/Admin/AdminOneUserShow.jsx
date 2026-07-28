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
        <div className="card">
          <h2>Loading...</h2>
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="card">
        <h2>User Information</h2>
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

      <div className="card">
        <h2>Donations History</h2>
        {currentDonations.length === 0 ? (
          <div>
            <span>
              💰
            </span>
            <p>No donations yet</p>
          </div>
        ) : (
          <div>
            {currentDonations.map((donation) => (
              <div
                key={donation._id}>
                <div>
                  <div>
                    <strong>Package:</strong>{" "}
                    <span>
                      {donation.package?.title || "N/A"}
                    </span>
                  </div>
                  <div>
                    <strong>Category:</strong>{" "}
                    <span>
                      {donation.category?.name || "N/A"}
                    </span>
                  </div>
                  <div>
                    <strong>Amount:</strong>{" "}
                    <span>
                      ${donation.amount}
                    </span>
                  </div>
                  <div>
                    <strong>Date:</strong>{" "}
                    <span>
                      {new Date(donation.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
    </div>
  );
};

export default AdminShowUser;
