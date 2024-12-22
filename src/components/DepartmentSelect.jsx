/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Card from "./Card.jsx";
import "./CardAndSelectStyle.css";
import { useNavigate } from "react-router-dom";

function DepartmentSelect() {
  const navigate = useNavigate();
  const departments = [
    { id: 1, name: "CSE", description: "Click here to know about the regulations of CSE department" },
    { id: 2, name: "IT", description: "Click here to know about the regulations of IT department" },
    { id: 3, name: "AIDS", description: "Click here to know about the regulations of AIDS department" },
    { id: 4, name: "AIML", description: "Click here to know about the regulations of AIML department" },
    { id: 5, name: "CyberSecurity", description: "Click here to know about the regulations of CyberSecurity department" },
    { id: 6, name: "CSBS", description: "Click here to know about the regulations of CSBS department" },
    { id: 7, name: "MECH", description: "Click here to know about the regulations of MECH department" },
    { id: 8, name: "MCT", description: "Click here to know about the regulations of MCT department" },
    { id: 9, name: "ECE", description: "Click here to know about the regulations of ECE department" },
    { id: 10, name: "EEE", description: "Click here to know about the regulations of EEE department" },
    { id: 11, name: "VLSI", description: "Click here to know about the regulations of VLSI department" },
    { id: 12, name: "BME", description: "Click here to know about the regulations of BME department" },
    { id: 13, name: "ACT", description: "Click here to know about the regulations of ACT department" },
    { id: 14, name: "CIVIL", description: "Click here to know about the regulations of CIVIL department" },
  ];

  const [expandedCard, setExpandedCard] = useState(null); // Tracks which card is expanded
  const [selectedOption, setSelectedOption] = useState(""); // Tracks selected radio button globally

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id); // Toggle card expansion
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value); // Update selected radio button globally
  };

  // On clicking continue button, navigate to the dashboard and pass the selected option as state
  const handleContinue = () => {
    navigate("/dashboard", { state: { rd: selectedOption } });
  };

  return (
    <>
      <div className="grid-container">
        {departments.map((dept) => (
          <Card
            key={dept.id}
            id={dept.id}
            name={dept.name}
            description={dept.description}
            isExpanded={expandedCard === dept.id}
            onClick={() => handleCardClick(dept.id)}
            selectedOption={selectedOption}
            onOptionChange={handleOptionChange}
          />
        ))}
      </div>
      {selectedOption && (
        <>
          <h3 id="selected-option-h3">Selected Option: {selectedOption}</h3>
          <div className="continue-button">
            <button onClick={handleContinue}>
              Continue
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default DepartmentSelect;
