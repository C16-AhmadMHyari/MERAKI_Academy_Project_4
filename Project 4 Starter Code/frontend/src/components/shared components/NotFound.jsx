import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px 20px",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "120px",
          color: "#4a90e2",
          margin: "0",
        }}
      >
        404
      </h1>

      <h2
        style={{
          color: "#666",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          color: "#999",
          fontSize: "18px",
          marginBottom: "30px",
        }}
      >
        Sorry, the page you're looking for doesn't exist.
      </p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/")}>🏠 Go Home</button>
        <button onClick={() => navigate(-1)}>← Go Back</button>
      </div>
    </div>
  );
};

export default NotFound;
