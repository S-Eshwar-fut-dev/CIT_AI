import React, { useState } from "react";
import Card from "./Card.jsx";
import "./CardAndSelectStyle.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function DepartmentSelect() {
  const location = useLocation();
  const { dept } = location.state || {};
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  // Handle change for the radio buttons
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // On clicking continue button, navigate to the dashboard and pass the selected option as state
  const handleContinue = () => {
    navigate("/dashboard", { state: { rd: dept +'-'+ selectedOption } });
  };

  return (
    <div className="grid-container">
      <Card
        dept={dept}
        selectedOption={selectedOption}
        onOptionChange={handleOptionChange}
        onContinue={handleContinue}
      />
    </div>
  );
}

export default DepartmentSelect;
