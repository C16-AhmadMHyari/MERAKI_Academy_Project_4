import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { appContext } from "../../App";

const Navbar = () => {
  const { token, setToken, role, setRole } = useContext(appContext);

  return (
    <nav
      style={{
        backgroundColor: "#4a90e2",
        padding: "15px 0",
        marginBottom: "20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Link to="/" style={linkStyle}>
            🏠 Home
          </Link>
          {role === "ADMIN" && (
            <Link to="/users/adminpanel" style={linkStyle}>
              ⚙️ Admin Panel
            </Link>
          )}
          {role === "USER" && (
            <Link to="/user/categories" style={linkStyle}>
              📂 Fields of Support
            </Link>
          )}
          {role === "USER" && (
            <Link to="/user/urgents" style={linkStyle}>
              🚨 Urgent Campaigns
            </Link>
          )}
          <Link to="/about" style={linkStyle}>
            ℹ️ About
          </Link>
          {role === "USER" && (
            <Link to="/user/chart" style={linkStyle}>
              🛒 Cart
            </Link>
          )}
        </div>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {!token ? (
            <>
              <Link
                to="/users/login"
                style={{
                  ...linkStyle,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.2)";
                }}
              >
                Login
              </Link>
              <Link
                to="/users/register"
                style={{
                  ...linkStyle,
                  backgroundColor: "white",
                  color: "#4a90e2",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              to="/"
              onClick={() => {
                localStorage.clear();
                setToken(null);
                setRole(null);
              }}
              style={{
                ...linkStyle,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
              }}
            >
              🚪 Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  transition: "background-color 0.3s",
  fontSize: "16px",
  display: "inline-block",
};

export default Navbar;
