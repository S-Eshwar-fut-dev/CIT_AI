// PreviewTable.jsx
import React from "react";

const PreviewTable = ({ courses }) => {
  console.log("PREVIEW TABLE  ");
  console.log(courses);
  return (
    <table className="course-table">
      <thead>
        <tr>
          <th>Sno</th>
          <th>Course Code</th>
          <th>Course Name</th>
          <th>Category</th>
          <th>T/P</th>
          <th>Gate/Common</th>
          <th>Common Departments</th>
          <th>Credits</th>
          <th>LTP</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={index}>
            <td>{course.sno}</td>
            <td>{course.course_code}</td>
            <td>{course.course_name}</td>
            <td>{course.category}</td>
            <td>{course.tp}</td>
            <td>{course.gate_common}</td>
            <td>{course.common_dept.length != 0 ?  course.common_dept.join(", ") : "None"}</td>
            <td>{course.credits}</td>
            <td>{course.ltp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PreviewTable;
