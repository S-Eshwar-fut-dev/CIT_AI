import express from "express";
import pool from "../config/db.js";

const router = express.Router();

const categoryMapping = {
  HSMC: 'Humanities & Social Science Courses (HSMC)',
  BSC: 'Basic Science Courses (BSC)',
  ESC: 'Engineering Science Courses (ESC)',
  PCC: 'Program Core Courses (PCC)',
  PEC: 'Professional Elective Courses (PEC)',
  OEC: 'Open Elective Courses (OEC)',
  EEC: 'Employability Enhancement Courses (EEC)',
  MC: 'Mandatory Courses (MC)',
};

// Insert or update course details
router.post("/semester-details", async (req, res) => {
  console.log("Received data:", req.body);
  const { courses } = req.body;

  if (!courses || !Array.isArray(courses)) {
    return res.status(400).send("Invalid request format");
  }

  try {
    const insertOrUpdateQuery = `
      INSERT INTO courses (sno, department, regulation, semester, course_code, course_name, category, tp, gate_common, common_dept, credits, ltp)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (department, regulation, semester, sno)
      DO UPDATE SET
        course_code = EXCLUDED.course_code,
        course_name = EXCLUDED.course_name,
        category = EXCLUDED.category,
        tp = EXCLUDED.tp,
        gate_common = EXCLUDED.gate_common,
        common_dept = EXCLUDED.common_dept::text[],
        credits = EXCLUDED.credits,
        ltp = EXCLUDED.ltp
    `;

    for (let course of courses) {
      const { sno, department, regulation, semester, course_code, course_name, category, tp, gate_common, common_dept, credits, ltp } = course;
      await pool.query(insertOrUpdateQuery, [
        sno,
        department,
        regulation,
        semester,
        course_code,
        course_name,
        category,
        tp,
        gate_common,
        common_dept,
        credits,
        ltp,
      ]);
    }

    await recalculateCredits(courses[0].department, courses[0].regulation, courses[0].semester);

    res.status(200).send({ message: "Courses successfully inserted or updated and credits recalculated!" });
  } catch (error) {
    console.error("Error inserting/updating courses:", error.message);
    res.status(500).send({ message: "Error inserting/updating courses." });
  }
});

// Fetch semester details
router.get("/semester-details", async (req, res) => {
  const { department, regulation, sno, semester } = req.query;

  if (!department || !regulation) {
    console.log("Missing required query parameters: department or regulation");
    return res.status(400).send("Missing required query parameters");
  }

  try {
    let query = `
      SELECT sno, department, regulation, semester, course_code, course_name, category, tp, gate_common, common_dept, credits, ltp
      FROM courses
      WHERE department = $1 AND regulation = $2
    `;
    const values = [department, regulation];

    if (semester) {
      query += " AND semester = $3";
      values.push(semester);
    } else {
      console.log("No semester specified, fetching all semesters.");
    }

    if (sno) {
      query += " AND sno = $4";
      values.push(sno);
    }

    const { rows } = await pool.query(query, values);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error("Error fetching records:", error.message);
    res.status(500).send({ message: "Error fetching records" });
  }
});

async function recalculateCredits(department, regulation, semester) {
  try {
    const regulationTable = regulation.toLowerCase();
    const resetCreditsQuery = `
      UPDATE ${regulationTable}
      SET credits = 0
      WHERE department = $1 AND semester = $2;
    `;
    await pool.query(resetCreditsQuery, [department, semester]);

    const creditQuery = `
      SELECT category, SUM(credits) AS total_credits
      FROM courses
      WHERE department = $1 AND regulation = $2 AND semester = $3
      GROUP BY category
    `;
    const creditResult = await pool.query(creditQuery, [department, regulation, semester]);

    const categoryCredits = creditResult.rows;

    for (let categoryData of categoryCredits) {
      let { category, total_credits } = categoryData;

      const fullCategory = categoryMapping[category] || category;

      const queryUpdateCategoryCredits = `
        INSERT INTO ${regulationTable} (department, semester, category, credits)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (department, semester, category)
        DO UPDATE SET credits = $4;
      `;
      const valuesUpdateCategoryCredits = [department, semester, fullCategory, total_credits];

      await pool.query(queryUpdateCategoryCredits, valuesUpdateCategoryCredits);
    }

    console.log("Credits successfully recalculated and updated in the regulation table.");
  } catch (error) {
    console.error("Error recalculating and updating credits:", error);
  }
}

export default router;
