import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>
        404
      </h1>

      <h2>
        Page Not Found
      </h2>

      <p>
        Sorry, the page you're looking for doesn't exist.
      </p>

      <div>
        <button onClick={() => navigate("/")}>🏠 Go Home</button>
        <button onClick={() => navigate(-1)}>← Go Back</button>
      </div>
    </div>
  );
};

export default NotFound;
