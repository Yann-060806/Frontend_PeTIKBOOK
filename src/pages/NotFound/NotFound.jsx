import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1 className="notfound-code">404</h1>

        <p className="notfound-text">
          Maaf, halaman yang anda tuju tidak tersedia
        </p>

        <div className="notfound-actions">
          <button className="btn-back" onClick={handleBack}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
