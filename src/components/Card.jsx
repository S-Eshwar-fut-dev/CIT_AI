import React from "react";

function Card({ dept, selectedOption, onOptionChange, onContinue }) {
  return (
    <div className="card-container">
      <div className={`card ${selectedOption ? "expanded" : ""}`}>
        <h2>{dept}</h2>
        <p>Select the regulation which you are going to fill the details for</p>
        <form>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="regulation"
                value="R21"
                checked={selectedOption === "R21"}
                onChange={onOptionChange}
              />
              <span>Regulation 2021</span>
            </label>
            <label>
              <input
                type="radio"
                name="regulation"
                value="R22"
                checked={selectedOption === "R22"}
                onChange={onOptionChange}
              />
              <span>Regulation 2022</span>
            </label>
            <label>
              <input
                type="radio"
                name="regulation"
                value="R22R"
                checked={selectedOption === "R22R"}
                onChange={onOptionChange}
              />
              <span>Regulation 2022 Revised</span>
            </label>
            <label>
              <input
                type="radio"
                name="regulation"
                value="R24"
                checked={selectedOption === "R24"}
                onChange={onOptionChange}
              />
              <span>Regulation 2024</span>
            </label>
          </div>
        </form>

        {selectedOption && (
          <div className="selected-option-container">
            <h3 className="selected-option-text">
              Selected Option: {selectedOption}
            </h3>
            <div className="continue-button">
              <button onClick={onContinue}>Continue</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
