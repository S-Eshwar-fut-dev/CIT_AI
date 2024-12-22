/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import logo from "../assets/cit_logo.jpeg";

const Table = ({ semesterData, categoryData, categoryMapping }) => {
  // Function to calculate total credits for a list of courses
  const calculateTotalCredits = (courses) => {
    return courses.reduce(
      (total, course) => total + parseFloat(course.credits || 0),
      0
    );
  };

  // useEffect hook to add the print functionality after the component mounts
  useEffect(() => {
    const button = document.getElementById("pdf");
    const tables = document.querySelectorAll(".generatePDF");

    button.addEventListener("click", function () {
      const mywindow = window.open("", "PRINT", "height=600,width=600");
      // Open the new window
      mywindow.document.open();

      // Write styles and content for the document
      mywindow.document.write(`
        <html>
          <head>
            <style>
              @page {
                size: auto;
                margin: 0;
              }
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
              .logo {
                text-align: center;
                margin-bottom: 20px;
              }
              .logo img {
                width: 200px; /* Adjust as needed */
                height: auto;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 30px; /* Add space between tables */
              }
              th, td {
                padding: 10px;
                border: 1px solid #ddd;
                text-align: left;
                word-wrap: break-word;
                white-space: pre-wrap;
              }
              th {
                background-color: #f2f2f2;
                text-align: center;
              }
              .footer-note {
                font-size: 12px;
                margin-top: 20px;
              }
              .generatePDF {
                page-break-before: always;
              }
              .generatePDF:last-child {
                page-break-after: auto;
              }
              .no-data {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                font-size: 20px;
                font-weight: bold;
                color: #555;
              }
            </style>
          </head>
          <body>
            <div class="logo">
              <img src="${logo}" alt="Logo Placeholder" />
            </div>
      `);

      tables.forEach((table) => {
        const heading = table.previousElementSibling;
        if (heading) {
          mywindow.document.write(`
            <h2 style="text-align: center;">${heading.innerText}</h2>
          `);
        }
        mywindow.document.write(table.outerHTML);
      });

      mywindow.document.write(`
        <div class="footer-note">
          *NCC Credit Course is offered for NCC students only. The grades earned by the students will be recorded in the Mark Sheet; however, the same shall not be considered for the computation of CGPA.
        </div>
        </body>
      </html>
      `);

      mywindow.document.close();
      mywindow.focus();
      mywindow.print();
      return true;
    });
  }, []);

  const isEmptyData =
    Object.keys(semesterData).length === 0 &&
    Object.keys(categoryData).length === 0;

  return (
    <div>
      {isEmptyData ? (
        <div className="no-data">
          No data available for the selected department and regulation.
        </div>
      ) : (
        <>
          {/* Semester-wise tables */}
          {Object.entries(semesterData).map(([semester, courses]) => (
            <div key={semester} style={{ marginBottom: "20px" }}>
              <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
                Semester {semester}
              </h2>
              {courses.length > 0 ? (
                <table
                  className="generatePDF"
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
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {course.course_code}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {course.tp}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {course.course_name}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {course.credits}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
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
              <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
                {categoryMapping[category]}
              </h3>
              <table
                className="generatePDF"
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
                    <td
                      colSpan="4"
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
            </div>
          ))}
        </>
      )}
      <button
        id="pdf"
        style={{
          top: "15px",
          right: "10px",
          fontSize: "18px",
          cursor: "pointer",
          border: "none",
          padding: "8px 16px",
          color: "white",
          textTransform: "uppercase",
          position: "fixed",
          borderRadius: "10px",
          backgroundColor: "#4CAF50",
          transition: "background-color 0.3s",
        }}
      >
        Print
      </button>
    </div>
  );
};

export default Table;
