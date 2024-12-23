/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import logo from "../assets/cit_logo.jpeg";

const Table = ({ semesterData, categoryData, categoryMapping }) => {
  const calculateTotalCredits = (courses) => {
    return courses.reduce(
      (total, course) => total + parseFloat(course.credits || 0),
      0
    );
  };

  useEffect(() => {
    const button = document.getElementById("pdf");
    const tables = document.querySelectorAll(".generatePDF");

    const handlePrint = () => {
      const printWindow = window.open("", "PRINT", "height=500,width=800");

      if (!printWindow) {
        alert("Pop-up blocked. Please allow pop-ups for this website.");
        return;
      }

      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Course Details</title>
            <style>
              @page {
                size: A4;
                margin: 10mm;
              }
              body {
                font-family: Arial, sans-serif;
                font-size: 12px;
                margin: 0;
                padding: 0;
              }
              .logo {
                text-align: center;
                margin-bottom: 20px;
              }
              .logo img {
                width: 100px;
                height: auto;
              }
              table {
                width: 100%;
                margin-bottom: 20px;
                border: 2px solid black;
                text-align: center;
              }
              th, td {
                padding: 8px;
                border: 2px solid black;
                word-wrap: break-word;
                text-align: center;
              }
              .footer-note {
                position: absolute;
                font-size: 10px;
                margin-top: 20px;
                text-align: center;
                color: #555;
              }
              .generatePDF {
                page-break-inside: avoid;
              }
            </style>
          </head>
          <body>
            <div class="logo">
              <img src="${logo}" alt="Institute Logo" />
            </div>
      `);

      // Write each table to the new document
      tables.forEach((table) => {
        const heading = table.previousElementSibling;
        if (heading) {
          printWindow.document.write(
            `<h2 style="text-align: center;">${heading.innerText}</h2>`
          );
        }
        printWindow.document.write(table.outerHTML);
      });

      // Add footer note
      printWindow.document.write(`
        <div class="footer-note">
          *NCC Credit Course is offered for NCC students only. The grades earned by the students will be recorded in the Mark Sheet; however, the same shall not be considered for the computation of CGPA.
        </div>
        </body>
        </html>
      `);

      printWindow.document.close();

      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      }, 500);
    };

    button.addEventListener("click", handlePrint);

    return () => {
      button.removeEventListener("click", handlePrint);
    };
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
                    border: "1px solid black",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          border: "1px solid black",
                          background: "white",
                          color: "black",
                        }}
                      >
                        Course Code
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          border: "1px solid black",
                          background: "white",
                          color: "black",
                        }}
                      >
                        Theory/Practical
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          border: "1px solid black",
                          background: "white",
                          color: "black",
                        }}
                      >
                        Course Name
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          border: "1px solid black",
                          background: "white",
                          color: "black",
                        }}
                      >
                        Credits
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          border: "1px solid black",
                          background: "white",
                          color: "black",
                        }}
                      >
                        LTP
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "center",
                            border: "1px solid black",
                            background: "white",
                            color: "black",
                          }}
                        >
                          {course.course_code}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "center",
                            border: "1px solid black",
                            background: "white",
                            color: "black",
                          }}
                        >
                          {course.tp}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "center",
                            border: "1px solid black",
                            background: "white",
                            color: "black",
                          }}
                        >
                          {course.course_name}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "center",
                            border: "1px solid black",
                            background: "white",
                            color: "black",
                          }}
                        >
                          {course.credits}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "center",
                            border: "1px solid black",
                            background: "white",
                            color: "black",
                          }}
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
                        style={{
                          textAlign: "right",
                          padding: "10px",
                          border: "1px solid black",
                          background: "white",
                          color: "black",
                        }}
                      >
                        <strong>Total Credits:</strong>
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          border: "1px solid black",
                          background: "white",
                          color: "black",
                        }}
                      >
                        <strong>{calculateTotalCredits(courses)}</strong>
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid black",
                          background: "white",
                          color: "black",
                        }}
                      >
                        {" "}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <p>No records available for Semester {semester}.</p>
              )}
            </div>
          ))}
        </>
      )}
      <button
        id="pdf"
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "rgb(40, 167, 69)",
          color: "rgb(255, 255, 255)",
          cursor: "pointer",
          width: "100px",
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        Print
      </button>
    </div>
  );
};

export default Table;
