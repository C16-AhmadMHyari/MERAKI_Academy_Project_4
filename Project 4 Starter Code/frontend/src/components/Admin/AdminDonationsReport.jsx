import axios from "axios";
import { useEffect, useState } from "react";

const AdminDonationsReport = () => {
  const [donations, setDonations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [packages, setPackages] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 5;

  useEffect(() => {
    axios.get("http://localhost:5000/categories/").then((response) => {
      setCategories(response.data.result);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/packages/").then((response) => {
      setPackages(response.data.result);
    });
  }, []);

  useEffect(() => {
    let url = "http://localhost:5000/users/alldonations?";

    if (selectedCategory) {
      url += `category=${selectedCategory}&`;
    }

    if (selectedPackage) {
      url += `package=${selectedPackage}`;
    }

    axios
      .get(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setDonations(response.data);
        setCurrentPage(1);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCategory, selectedPackage]);

  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(
    indexOfFirstDonation,
    indexOfLastDonation
  );

  const totalPages = Math.ceil(donations.length / donationsPerPage);

  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div className="container">
      <h1>Donations Report</h1>

      <div className="card">
        <h3>Filter Donations</h3>
        <div>
          <div>
            <label>
              Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>
              Filter by Package
            </label>
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}>
              <option value="">All Packages</option>
              {packages.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedCategory("");
            setSelectedPackage("");
          }}>
          🔄 Clear Filters
        </button>
      </div>

      <div className="card">
        <h2>Total Donations</h2>
        <p>
          ${totalAmount.toFixed(2)}
        </p>
        <p>From {donations.length} donation(s)</p>
      </div>

      <div className="card">
        {currentDonations.length === 0 ? (
          <div>
            <span>
              📊
            </span>
            <h2>No donations found</h2>
          </div>
        ) : (
          <div>
            {currentDonations.map((donation) => (
              <div
                key={donation._id}>
                <div>
                  <div>
                    <strong>User:</strong>{" "}
                    <span>
                      {donation.user?.firstName} {donation.user?.lastName}
                    </span>
                  </div>
                  <div>
                    <strong>Email:</strong>{" "}
                    <span>{donation.user?.email}</span>
                  </div>
                  <div>
                    <strong>Package:</strong>{" "}
                    <span>
                      {donation.package?.title || "N/A"}
                    </span>
                  </div>
                  <div>
                    <strong>Category:</strong>{" "}
                    <span>
                      {donation.category?.title || "N/A"}
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

export default AdminDonationsReport;