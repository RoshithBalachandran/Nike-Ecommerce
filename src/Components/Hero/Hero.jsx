import React, { useEffect } from "react";
import "./Hero.css";
import arrow from "../Assets/arrow.png";
import hero_img from "../Assets/Nike-easy-banner.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  useEffect(()=>{
      window.scrollTo({ top: 0, behavior: "smooth" });
  })
  return (
    <div className="hero">
      {/* Left Side Content */}
      <div className="hero-left">
        <h1>NEW ARRIVALS ONLY</h1>
        <p className="hero-text">
          <i>Shoes Collection For Everyone</i>
        </p>
        <Link to="/collection" className="hero-latest-btn">
          Latest Collections <img src={arrow} alt="arrow" className="arrow-icon" loading="lazy" />
        </Link>
      </div>

      {/* Hero Image */}
      <img src={hero_img} alt="Nike Shoes" className="hero-img" loading="lazy" />
    </div>
  );
};

export default Hero;

