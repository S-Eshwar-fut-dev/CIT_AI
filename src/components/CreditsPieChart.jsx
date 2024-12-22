/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "./Chart"; // Import the Chart component
import Table from "./Table"; // Import the Table component

const CreditsPieChart = () => {
  const [departments] = useState([
    { id: 1, name: "CSE" },
    { id: 2, name: "IT" },
    { id: 3, name: "AIDS" },
    { id: 4, name: "AIML" },
    { id: 5, name: "CyberSecurity" },
    { id: 6, name: "CSBS" },
    { id: 7, name: "MECH" },
    { id: 8, name: "MCT" },
    { id: 9, name: "ECE" },
    { id: 10, name: "EEE" },
    { id: 11, name: "VLSI" },
    { id: 12, name: "BME" },
    { id: 13, name: "ACT" },
    { id: 14, name: "CIVIL" },
  ]);

  const [regulations] = useState(["R21", "R22", "R22R", "R24"]);
  const [selectedReg, setSelectedReg] = useState("R21");
  const [selectedDept, setSelectedDept] = useState("");
  const [semesterData, setSemesterData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [viewMode, setViewMode] = useState("chart"); // Default to 'chart'

  const categoryMapping = {
    HSMC: "Humanities & Social Science Courses (HSMC)",
    BSC: "Basic Science Courses (BSC)",
    ESC: "Engineering Science Courses (ESC)",
    PCC: "Program Core Courses (PCC)",
    PEC: "Professional Elective Courses (PEC)",
    OEC: "Open Elective Courses (OEC)",
    EEC: "Employability Enhancement Courses (EEC)",
    MC: "Mandatory Courses (MC)",
  };

  useEffect(() => {
    if (selectedDept && selectedReg) {
      fetchSemesterData(selectedDept, selectedReg);
      fetchCategoryData(selectedDept, selectedReg);
    }
  }, [selectedDept, selectedReg]);

  const fetchSemesterData = async (department, regulation) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/courses/semester",
        {
          params: { department, regulation },
        }
      );
      setSemesterData(response.data);
    } catch (err) {
      console.error(err);
      setSemesterData({});
    }
  };

  const fetchCategoryData = async (department, regulation) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/courses/category",
        {
          params: { department, regulation },
        }
      );
      setCategoryData(response.data);
    } catch (err) {
      console.error(err);
      setCategoryData({});
    }
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Department Courses Overview</h1>
      <div>
        <select
          onChange={(e) => setSelectedDept(e.target.value)}
          value={selectedDept}
        >
          <option value="">Select a Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ margin: "10px 0" }}>
        <label htmlFor="regulation-select">Select Regulation:</label>
        <select
          id="regulation-select"
          onChange={(e) => setSelectedReg(e.target.value)}
          value={selectedReg}
          style={{ marginLeft: "10px" }}
        >
          {regulations.map((reg, index) => (
            <option key={index} value={reg}>
              {reg}
            </option>
          ))}
        </select>
      </div>

      <div style={{ margin: "20px 0" }}>
        <button
          onClick={() => handleViewChange("chart")}
          disabled={viewMode === "chart"}
        >
          View Chart
        </button>
        <button
          onClick={() => handleViewChange("table")}
          disabled={viewMode === "table"}
        >
          View Table
        </button>
      </div>

      {viewMode === "chart" &&
        semesterData &&
        Object.keys(semesterData).length > 0 && (
          <Chart
            categoryData={categoryData}
            categoryMapping={categoryMapping}
          />
        )}

      {viewMode === "chart" && Object.keys(semesterData).length === 0 && (
        <p>No data available for the selected department and regulation.</p>
      )}

      {viewMode === "table" && Object.keys(semesterData).length != 0 && (
        <>
          <Table
          
            semesterData={semesterData}
            categoryData={categoryData}
            categoryMapping={categoryMapping}
          />
        </>
      )}
    </div>
  );
};

export default CreditsPieChart;
