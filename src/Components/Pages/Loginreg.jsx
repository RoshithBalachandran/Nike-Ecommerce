import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Loginreg.css";

const API_URL = "http://localhost:3001/users";

const CombinedLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ADMIN_EMAIL = "NikeStore@gmail.com";
  const ADMIN_PASSWORD = "369369";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Email and Password are required!");
    }

    // ✅ Admin Login
    if (
      email.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("adminAuth", "true");
      localStorage.removeItem("loggedInUser"); // Make sure no conflict
      navigate("/admin/dashboard");
      return;
    }

    // ✅ User Login
    try {
      const res = await fetch(API_URL);
      const users = await res.json();

      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user) return setError("User not found! Please sign up.");
      if (user.password !== password) return setError("Incorrect password!");

      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.removeItem("adminAuth"); // Just in case
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/Signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default CombinedLogin;
