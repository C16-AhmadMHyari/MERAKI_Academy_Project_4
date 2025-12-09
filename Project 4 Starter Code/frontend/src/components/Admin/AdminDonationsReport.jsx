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
      <h1 style={{ marginBottom: "30px" }}>Donations Report</h1>

      <div className="card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "20px" }}>Filter Donations</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <div>
            <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>
              Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: "100%", maxWidth: "100%" }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>
              Filter by Package
            </label>
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              style={{ width: "100%", maxWidth: "100%" }}
            >
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
          }}
          style={{ backgroundColor: "#95a5a6" }}
        >
          🔄 Clear Filters
        </button>
      </div>

      <div className="card" style={{ marginBottom: "20px", textAlign: "center", backgroundColor: "#e8f4f8" }}>
        <h2 style={{ color: "#4a90e2", marginBottom: "10px" }}>Total Donations</h2>
        <p style={{ fontSize: "32px", fontWeight: "bold", color: "#27ae60" }}>
          ${totalAmount.toFixed(2)}
        </p>
        <p style={{ color: "#666" }}>From {donations.length} donation(s)</p>
      </div>

      <div className="card">
        {currentDonations.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <span
              style={{
                fontSize: "64px",
                marginBottom: "15px",
                display: "block",
              }}
            >
              📊
            </span>
            <h2 style={{ color: "#999" }}>No donations found</h2>
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
                    <strong style={{ color: "#4a90e2" }}>User:</strong>{" "}
                    <span style={{ color: "#333" }}>
                      {donation.user?.firstName} {donation.user?.lastName}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: "#4a90e2" }}>Email:</strong>{" "}
                    <span style={{ color: "#333" }}>{donation.user?.email}</span>
                  </div>
                  <div>
                    <strong style={{ color: "#4a90e2" }}>Package:</strong>{" "}
                    <span style={{ color: "#333" }}>
                      {donation.package?.title || "N/A"}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: "#4a90e2" }}>Category:</strong>{" "}
                    <span style={{ color: "#333" }}>
                      {donation.category?.title || "N/A"}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: "#4a90e2" }}>Amount:</strong>{" "}
                    <span style={{ color: "#27ae60", fontWeight: "600", fontSize: "18px" }}>
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

export default AdminDonationsReport;