import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs
import "./CSS/Signup.css";

const API_URL = "http://localhost:3001/users";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const { firstName, lastName, phone, email, password, confirmPassword } = formData;

    // Validation
    if (Object.values(formData).some((val) => val === "")) {
      return setError("All fields are required!");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      console.log("Checking existing users...");
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch users");

      const users = await response.json();
      
      if (users.find((user) => user.email.toLowerCase() === email.toLowerCase())) {
        return setError("User already exists! Please log in.");
      }

      // Create new user
      const newUser = { 
        id: uuidv4(), // Unique ID
        firstName, 
        lastName, 
        phone, 
        email, 
        password 
      };

      console.log("Creating new user:", newUser);

      const postResponse = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      console.log("Response Status:", postResponse.status);
      if (!postResponse.ok) throw new Error("Failed to create user");

      alert("Signup Successful! Please log in.");
      navigate("/Login");
    } catch (error) {
      console.error("Signup Error:", error.message);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="loginreg">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          {Object.keys(formData).map((key) => (
            key !== "confirmPassword" ? (
              <input
                key={key}
                type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                name={key}
                placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                value={formData[key]}
                onChange={handleChange}
              />
            ) : null
          ))}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p>Already have an account? <button onClick={() => navigate("/Login")}>Login</button></p>
      </div>
    </div>
  );
};

export default Signup;
