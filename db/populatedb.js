#! /usr/bin/env node
const { argv } = require("node:process");

const { Pool } = require("pg");

const DB_URL = argv[2];
const SQL = `
CREATE TABLE IF NOT EXISTS types (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR( 255 ) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS brands (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR( 255 ) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  year INT NOT NULL,
  model VARCHAR ( 255 ) NOT NULL,
  price INT NOT NULL,  
  type_id INT NOT NULL,
  brand_id INT NOT NULL,
  CONSTRAINT fk_type 
    FOREIGN KEY(type_id) REFERENCES types(id), 
  CONSTRAINT fk_brand
    FOREIGN KEY(brand_id) REFERENCES brands(id) 
);
INSERT INTO brands (name) VALUES
('Toyota'),
('Honda'),
('Ford'),
('BMW'),
('Mercedes-Benz');

INSERT INTO types (name) VALUES
('Sedan'),
('SUV'),
('Truck'),
('Coupe'),
('Hatchback');

INSERT INTO cars (model, year, price, brand_id, type_id) VALUES
-- Toyota (brand_id: 1)
('Camry', 2023, 28000, 1, 1),
('RAV4', 2024, 32000, 1, 2),
('Tacoma', 2023, 35000, 1, 3),
('Corolla', 2024, 24000, 1, 1),
('Highlander', 2023, 42000, 1, 2),
-- Honda (brand_id: 2)
('Accord', 2023, 29000, 2, 1),
('CR-V', 2024, 33000, 2, 2),
('Civic', 2023, 25000, 2, 1),
('Pilot', 2024, 43000, 2, 2),
('Fit', 2022, 21000, 2, 5),
-- Ford (brand_id: 3)
('F-150', 2023, 40000, 3, 3),
('Explorer', 2024, 45000, 3, 2),
('Mustang', 2023, 38000, 3, 4),
('Escape', 2024, 31000, 3, 2),
('Ranger', 2023, 34000, 3, 3),
-- BMW (brand_id: 4)
('3 Series', 2023, 48000, 4, 1),
('X5', 2024, 65000, 4, 2),
('M4', 2023, 75000, 4, 4),
('X3', 2024, 55000, 4, 2),
('2 Series', 2023, 42000, 4, 4),
-- Mercedes-Benz (brand_id: 5)
('C-Class', 2023, 52000, 5, 1),
('GLE', 2024, 70000, 5, 2),
('E-Class', 2023, 62000, 5, 1),
('GLC', 2024, 58000, 5, 2),
('A-Class', 2022, 40000, 5, 5);
`;

async function main() {
  console.log("seeding...");
  const pool = new Pool({
    connectionString: DB_URL,
  });

  try {
    await pool.query(SQL);
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
    console.log("done");
  }
}

main();
