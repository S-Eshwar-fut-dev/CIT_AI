/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./NavBar.css";
import MenuBookIcon from "@mui/icons-material/MenuBook";

// Updated NavBar component that passes the selected semester to DashBoard
const NavBar = ({ onSelectSemester }) => {
  const semesters = [
    { icon: <MenuBookIcon />, title: "Semester 1", semester: "1" },
    { icon: <MenuBookIcon />, title: "Semester 2", semester: "2" },
    { icon: <MenuBookIcon />, title: "Semester 3", semester: "3" },
    { icon: <MenuBookIcon />, title: "Semester 4", semester: "4" },
    { icon: <MenuBookIcon />, title: "Semester 5", semester: "5" },
    { icon: <MenuBookIcon />, title: "Semester 6", semester: "6" },
    { icon: <MenuBookIcon />, title: "Semester 7", semester: "7" },
    { icon: <MenuBookIcon />, title: "Semester 8", semester: "8" },
  ];

  return (
    <div className="navbar">
      {semesters.map((semester) => (
        <div
          key={semester.semester}
          className="nav-item"
          onClick={() => onSelectSemester(semester.semester)}
        >
          {semester.icon}
          <span>{semester.title}</span>
        </div>
      ))}
    </div>
  );
};

export default NavBar;