#! /usr/bin/env node
const { argv } = require("node:process");
const { Pool } = require("pg"); // Use Pool for better connection management
require("dotenv").config();

const DB_URL = argv[2];

// --- 1. VALIDATE THE DATABASE URL ---
if (!DB_URL) {
  console.error("Error: Database connection URL not provided.");
  console.error("Usage: node temp_populatedb.js postgresql://user:password@host:port/database");
  process.exit(1); // Exit with an error code
}

// --- 2. DEFINE QUERIES AS AN ARRAY ---
// Each SQL statement is a separate string in the array.
const queries = [
  `CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL UNIQUE
  );`,
  `CREATE TABLE IF NOT EXISTS types (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL UNIQUE
  );`,
  `CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    year INT NOT NULL,
    model VARCHAR ( 255 ) NOT NULL,
    price INT NOT NULL,
    type_id INT NOT NULL REFERENCES types(id),
    brand_id INT NOT NULL REFERENCES brands(id)
  );`,
  // Use ON CONFLICT to prevent errors if brands/types already exist.
  `INSERT INTO brands (name) VALUES
    ('Toyota'), ('Honda'), ('Ford'), ('BMW'), ('Mercedes-Benz')
  ON CONFLICT (name) DO NOTHING;`,
  `INSERT INTO types (name) VALUES
    ('Sedan'), ('SUV'), ('Truck'), ('Coupe'), ('Hatchback')
  ON CONFLICT (name) DO NOTHING;`,
  // TRUNCATE clears the table so we have a fresh start for car data.
  // RESTART IDENTITY resets the ID counter, CASCADE removes dependent objects if any.
  `TRUNCATE TABLE cars RESTART IDENTITY CASCADE;`,
  // Insert all the car data in a single, final statement.
  `INSERT INTO cars (model, year, price, brand_id, type_id) VALUES
    ('Camry', 2023, 28000, 1, 1),
    ('RAV4', 2024, 32000, 1, 2),
    ('Tacoma', 2023, 35000, 1, 3),
    ('Corolla', 2024, 24000, 1, 1),
    ('Highlander', 2023, 42000, 1, 2),
    ('Accord', 2023, 29000, 2, 1),
    ('CR-V', 2024, 33000, 2, 2),
    ('Civic', 2023, 25000, 2, 1),
    ('Pilot', 2024, 43000, 2, 2),
    ('Fit', 2022, 21000, 2, 5),
    ('F-150', 2023, 40000, 3, 3),
    ('Explorer', 2024, 45000, 3, 2),
    ('Mustang', 2023, 38000, 3, 4),
    ('Escape', 2024, 31000, 3, 2),
    ('Ranger', 2023, 34000, 3, 3),
    ('3 Series', 2023, 48000, 4, 1),
    ('X5', 2024, 65000, 4, 2),
    ('M4', 2023, 75000, 4, 4),
    ('X3', 2024, 55000, 4, 2),
    ('2 Series', 2023, 42000, 4, 4),
    ('C-Class', 2023, 52000, 5, 1),
    ('GLE', 2024, 70000, 5, 2),
    ('E-Class', 2023, 62000, 5, 1),
    ('GLC', 2024, 58000, 5, 2),
    ('A-Class', 2022, 40000, 5, 5);`
];

async function main() {
  console.log("seeding...");
  const pool = new Pool({ connectionString: DB_URL });

  // --- 3. USE TRY/CATCH/FINALLY FOR ROBUST EXECUTION ---
  try {
    console.log("Executing queries...");
    // 4. LOOP THROUGH AND EXECUTE EACH QUERY
    for (const query of queries) {
      await pool.query(query);
    }
    console.log("All queries executed successfully.");

  } catch (err) {
    // If any query fails, the error will be caught here.
    console.error("--- SCRIPT FAILED ---");
    console.error("An error occurred during the seeding process:", err);
  } finally {
    // This block will always run, ensuring the pool is closed.
    await pool.end();
    console.log("Connection pool closed. Script finished.");
  }
}

main();
