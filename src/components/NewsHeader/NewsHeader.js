import React from "react";
import "./NewsHeader.scss";
import globalLogo from "../../assets/global.svg"; // Import the logo

const NewsHeader = () => {
  return (
    <header className="header-container">
      <div className="header-logo">
        <img className="logo" src={globalLogo} alt="Global News logo" />
        <h3>Marko News</h3>
      </div>
      <nav className="header-nav" aria-label="Main navigation">
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
