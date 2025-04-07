import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const API_URL = "http://localhost:3000/users";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!storedUser?.id) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/${storedUser.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return null;

  return (
    <>
      {showPopup && user && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button
              className="close-btn"
              onClick={() => {
                setShowPopup(false);
                navigate("/");
              }}
            >
              &times;
            </button>
            <h2 className="popup-title">
              Welcome, {user.firstName} {user.lastName}!
            </h2>
            <div className="popup-detail">
              <span>Email:</span> {user.email}
            </div>
            <div className="popup-detail">
              <span>Phone:</span> {user.phone}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
