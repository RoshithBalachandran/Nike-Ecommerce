import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import nikeorg from "../Assets/nikeorg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faMagnifyingGlass, faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const { cartItems, getTotalCartItems } = useContext(ShopContext) || {};
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // Detect active menu from path
  const getActiveMenu = () => {
    if (location.pathname === "/") return "shop";
    if (location.pathname.startsWith("/men")) return "men";
    if (location.pathname.startsWith("/women")) return "women";
    if (location.pathname.startsWith("/kids")) return "kids";
    if (location.pathname.startsWith("/collection")) return "collection";
    return "";
  };

  const [menu, setMenu] = useState(getActiveMenu());

  useEffect(() => {
    setMenu(getActiveMenu());
  }, [location.pathname]);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("loggedInUser"));
    const checkLoginStatus = () => setLoggedIn(!!localStorage.getItem("loggedInUser"));
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    setLoggedIn(false);
    navigate("/login");
    window.location.reload(); // Ensures full reset
  };

  const isAdminRoute = location.pathname.startsWith("/admin");
  if (isAdminRoute) return null;

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img className="Nike" src={nikeorg} alt="Logo" />
        </Link>
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
      </div>

      <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
        {["shop", "men", "women", "kids", "collection"].map((item) => (
          <li key={item} onClick={() => setMenu(item)}>
            <Link to={`/${item === "shop" ? "" : item}`} style={{ textDecoration: "none" }}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
            {menu === item && <hr />}
          </li>
        ))}
      </ul>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search here"
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" style={{ display: "none" }}></button>
      </form>

      <div className="login-cart">
        {loggedIn ? (
          <button onClick={handleLogout} type="button">
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        )}

        <Link to="/cart">
          <FontAwesomeIcon icon={faCartPlus} size="lg" />
        </Link>
        <div className="cart-count">{getTotalCartItems?.() || 0}</div>

        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} size="lg" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
