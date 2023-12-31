import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const history = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "80vh",
        gap:"20px"
      }}
    >
      <h1>404 page is not found</h1>
      <button
        onClick={() => history("/")}
        style={{
          padding: "7px 15px",
          background: "seagreen",
          color: "white",
          cursor: "pointer",
          border: "none",
        }}
      >
        Redirect Home Page
      </button>
    </div>
  );
};

export default Error;
