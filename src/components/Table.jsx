/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Table Component (React)

import React from "react";

const Table = ({ semesterData, categoryData, categoryMapping }) => {
  // Function to calculate total credits for a list of courses
  const calculateTotalCredits = (courses) => {
    return courses.reduce(
      (total, course) => total + parseFloat(course.credits || 0),
      0
    );
  };

  return (
    <div>
      {/* Semester-wise tables */}
      {Object.entries(semesterData).map(([semester, courses]) => (
        <div key={semester} style={{ marginBottom: "20px" }}>
          <h2>Semester {semester}</h2>

          {courses.length > 0 ? (
            <table
              style={{
                margin: "10px auto",
                borderCollapse: "collapse",
                width: "80%",
              }}
            >
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Course Code
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Theory/Practical
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Course Name
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Credits
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    LTP
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {course.course_code}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {course.tp}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {course.course_name}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {course.credits}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {course.ltp}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="3"
                    style={{ textAlign: "right", padding: "8px" }}
                  >
                    <strong>Total Credits:</strong>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <strong>{calculateTotalCredits(courses)}</strong>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <p>No records available for Semester {semester}.</p>
          )}
        </div>
      ))}

      {/* Category-wise tables */}
      {Object.entries(categoryData).map(([category, courses]) => (
        <div key={category} style={{ marginBottom: "20px" }}>
          <h3>{categoryMapping[category]}</h3>
          <table
            style={{
              margin: "10px auto",
              borderCollapse: "collapse",
              width: "80%",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Course Code
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Theory/Practical
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Course Name
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Semester
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Credits
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  LTP
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {course.course_code}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {course.tp}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {course.course_name}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {course.semester}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {course.credits}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {course.ltp}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" style={{ textAlign: "right", padding: "8px" }}>
                  <strong>Total Credits:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <strong>{calculateTotalCredits(courses)}</strong>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Table;
