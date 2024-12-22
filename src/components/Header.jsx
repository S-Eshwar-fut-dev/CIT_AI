import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./Header.css";
import logo from "../assets/cit_logo.jpeg";

const Header = () => {
  return (
    <div className="header">
      <div id="logo-container">
        <img src={logo} alt="CIT.AI Logo" id="logo" />
        <h1 id="header-h1">CIT.AI</h1>
      </div>
      {/* Button added to navigate to /chart */}
      <Link to="/chart" className="credits-button">
        <button id="credits-button">Go to Analysis</button>
      </Link>
    </div>
  );
};

export default Header;
