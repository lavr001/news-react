import React from "react";
import "./NewsFooter.scss";

const NewsFooter = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <p>&copy; 2025 Global News</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <ul>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <a href="/">Terms of Use</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
            <li>
              <a href="#top" className="back-to-top">
                Back to Top
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default NewsFooter;
