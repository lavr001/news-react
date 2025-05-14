import React, { useState } from "react";
import "./NewsHeader.scss";
import globalLogo from "../../assets/global.svg";

const NewsHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header-container">
      <div className="header-logo">
        <img className="logo" src={globalLogo} alt="Global News logo" />
        <h3>Global News</h3>
      </div>

      <button
        className={`burger-menu ${isMobileMenuOpen ? "open" : ""}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>

      <nav
        className={`header-nav ${isMobileMenuOpen ? "open" : ""}`}
        aria-label="Main navigation"
      >
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Categories</a>
          </li>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NewsHeader;
