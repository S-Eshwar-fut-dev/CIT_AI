import React from "react";

function Card({
  id,
  name,
  description,
  isExpanded,
  onClick,
  selectedOption,
  onOptionChange,
}) {
  const options = [
    `R21`,
    `R22`,
    `R22R`,
    `R24`,
  ];

  return (
    <div className={`card ${isExpanded ? "expanded" : ""}`} onClick={onClick}>
      <h2>{name}</h2>
      <p>{description}</p>
      {isExpanded && (
        <div className="options">
          <p>Choose One</p>
          {options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name="rd"
                value={`${name}-${option}`}
                checked={selectedOption === `${name}-${option}`}
                onChange={() => onOptionChange(`${name}-${option}`)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;
