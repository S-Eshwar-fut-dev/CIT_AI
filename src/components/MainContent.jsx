import React, { useState, useEffect } from "react";
import CourseDetails1 from "./semesters/courseDetails1.jsx";
import CourseDetails2 from "./semesters/courseDetails2.jsx";
import CourseDetails3 from "./semesters/courseDetails3.jsx";
import CourseDetails4 from "./semesters/courseDetails4.jsx";
import CourseDetails5 from "./semesters/courseDetails5.jsx";
import CourseDetails6 from "./semesters/courseDetails6.jsx";
import CourseDetails7 from "./semesters/courseDetails7.jsx";
import CourseDetails8 from "./semesters/courseDetails8.jsx";
import "./MainContent.css";

const MainContent = ({ selectedSemester, rd }) => {
  const [semesterCourses, setSemesterCourses] = useState({
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
    "7": [],
    "8": [],
  });

  // Function to update course data for a specific semester
  const updateCoursesForSemester = (semester, updatedCourses) => {
    setSemesterCourses((prevCourses) => ({
      ...prevCourses,
      [semester]: updatedCourses,
    }));
  };

  // Function to fetch the course details for the selected semester (if needed)
  const fetchCourses = async (semester, department, regulation) => {
    try {
      const response = await fetch(
        `http://localhost:5000/semester-details?department=${department}&regulation=${regulation}&semester=${semester}`
      );
      const data = await response.json();
      updateCoursesForSemester(semester, data); // Set the courses fetched from the server
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Split department and regulation from the rd prop
  const [dept, regulation] = rd.split("-");

  // Fetch the courses when the component mounts or when the semester changes
  useEffect(() => {
    fetchCourses(selectedSemester, dept, regulation);
  }, [selectedSemester, dept, regulation]);

  // Function to render the corresponding CourseDetails component based on selectedSemester
  const renderCourseDetails = () => {
    const commonProps = {
      department: dept,
      regulation: regulation,
      semester: selectedSemester,
      setCourses: updateCoursesForSemester,
    };

    switch (selectedSemester) {
      case "1":
        return <CourseDetails1 {...commonProps} courses={semesterCourses["1"]} />;
      case "2":
        return <CourseDetails2 {...commonProps} courses={semesterCourses["2"]} />;
      case "3":
        return <CourseDetails3 {...commonProps} courses={semesterCourses["3"]} />;
      case "4":
        return <CourseDetails4 {...commonProps} courses={semesterCourses["4"]} />;
      case "5":
        return <CourseDetails5 {...commonProps} courses={semesterCourses["5"]} />;
      case "6":
        return <CourseDetails6 {...commonProps} courses={semesterCourses["6"]} />;
      case "7":
        return <CourseDetails7 {...commonProps} courses={semesterCourses["7"]} />;
      case "8":
        return <CourseDetails8 {...commonProps} courses={semesterCourses["8"]} />;
      default:
        return <div className="welcome-msg">Select a semester to add course details</div>;
    }
  };

  return <div className="main_content">{renderCourseDetails()}</div>;
};

export default MainContent;
