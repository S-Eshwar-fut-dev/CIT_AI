/* eslint-disable no-unused-vars */
// /routes/courses.js

import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Endpoint to fetch semester-wise courses data for a department
router.get("/courses/semester", async (req, res) => {
  try {
    const { department, regulation } = req.query;
    if (!department || !regulation) {
      return res
        .status(400)
        .json({ message: "Missing department or regulation parameter" });
    }

    // Query to fetch courses for the specified department and regulation, grouped by semester
    const result = await pool.query(
      `SELECT course_code, course_name, credits, ltp, tp, semester
            FROM courses
            WHERE department = $1 AND regulation = $2
            ORDER BY semester`,
      [department, regulation]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({
          message:
            "No courses found for the selected department and regulation",
        });
    }

    // Organize courses data by semester
    const semesterData = {};
    result.rows.forEach((course) => {
      if (!semesterData[course.semester]) {
        semesterData[course.semester] = [];
      }
      semesterData[course.semester].push({
        course_code: course.course_code,
        course_name: course.course_name,
        credits: course.credits,
        ltp: course.ltp,
        tp: course.tp, // Include the TP field (Theory/Practical/TP)
      });
    });

    res.json(semesterData); // Return the data grouped by semester
  } catch (error) {
    console.error("Error fetching semester-wise courses:", error.message);
    res.status(500).json({ message: "Error retrieving semester-wise courses" });
  }
});

// Endpoint to fetch category-wise courses data for a department
router.get("/courses/category", async (req, res) => {
  try {
    const { department, regulation } = req.query;
    if (!department || !regulation) {
      return res
        .status(400)
        .json({ message: "Missing department or regulation parameter" });
    }

    // Query to fetch courses categorized by their respective categories
    const result = await pool.query(
      `SELECT course_code, course_name, category, credits, ltp, tp, semester
            FROM courses
            WHERE department = $1 AND regulation = $2
            ORDER BY category, semester`,
      [department, regulation]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({
          message:
            "No courses found for the selected department and regulation",
        });
    }

    // Category mapping for more readable results
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

    // Organize courses data by category
    const categoryData = {};
    result.rows.forEach((course) => {
      const categoryName = categoryMapping[course.category] || course.category;
      if (!categoryData[course.category]) {
        categoryData[course.category] = [];
      }
      categoryData[course.category].push({
        course_code: course.course_code,
        course_name: course.course_name,
        credits: course.credits,
        ltp: course.ltp,
        tp: course.tp, // Include the TP field (Theory/Practical/TP)
        semester: course.semester || "N/A", // Provide fallback for missing semester
      });
    });

    res.json(categoryData); // Return the data grouped by category
  } catch (error) {
    console.error("Error fetching category-wise courses:", error.message);
    res.status(500).json({ message: "Error retrieving category-wise courses" });
  }
});

export default router;
