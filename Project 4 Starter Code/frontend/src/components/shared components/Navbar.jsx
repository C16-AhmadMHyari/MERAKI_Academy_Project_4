import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { appContext } from "../../App";

const Navbar = () => {
  const { token, setToken, role, setRole } = useContext(appContext);

  return (
    <nav>
      <div
        className="container">
        <div>
          <Link to="/">
            🏠 Home
          </Link>
          {role === "ADMIN" && (
            <Link to="/users/adminpanel">
              ⚙️ Admin Panel
            </Link>
          )}
          {role === "USER" && (
            <Link to="/user/categories">
              📂 Fields of Support
            </Link>
          )}
          {role === "USER" && (
            <Link to="/user/urgents">
              🚨 Urgent Campaigns
            </Link>
          )}
          <Link to="/about">
            ℹ️ About
          </Link>
          {role === "USER" && (
            <Link to="/user/chart">
              🛒 Cart
            </Link>
          )}
        </div>

        <div>
          {!token ? (
            <>
              <Link
                to="/users/login"

                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.2)";
                }}>
                Login
              </Link>
              <Link
                to="/users/register"

                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}>
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

              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
              }}>
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
