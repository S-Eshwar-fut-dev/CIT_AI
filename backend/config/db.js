import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "arjuncoc101",
  database: "curriculum",
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to database:", err));

// Test the connection when the file is executed
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Connection failed:", err);
  } else {
    console.log("Connected to PostgreSQL:", res.rows[0]);
  }
});

export default pool;
