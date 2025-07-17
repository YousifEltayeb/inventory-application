const pool = require("./pool");
async function getAllTypes() {
  const { rows } = await pool.query("SELECT * FROM types");
  return rows;
}

async function getAllBrands() {
  const { rows } = await pool.query("SELECT * FROM brands");
  return rows;
}
async function getCarsByBrandId(brandId) {
  const { rows } = await pool.query(
    `
    SELECT cars.id, cars.model, cars.year, cars.price, types.name AS type, brands.name AS brand 
    FROM cars
    JOIN types ON cars.type_id = types.id                                    
    JOIN brands ON cars.brand_id = brands.id
    WHERE cars.brand_id = $1
`,
    [brandId],
  );
  return rows;
}

async function getCarsByTypeId(typeId) {
  const { rows } = await pool.query(
    `
    SELECT cars.id, cars.model, cars.year, cars.price, types.name AS type, brands.name AS brand 
    FROM cars
    JOIN types ON cars.type_id = types.id                                    
    JOIN brands ON cars.brand_id = brands.id
    WHERE cars.type_id = $1
`,
    [typeId],
  );
  return rows;
}

async function getCarById(carId) {
  const { rows } = await pool.query(`SELECT * FROM cars WHERE id = $1`, [
    carId,
  ]);
  return rows[0];
}
async function getTypeById(typeId) {
  const { rows } = await pool.query(
    `
        SELECT * FROM types WHERE id = $1
`,
    [typeId],
  );
  return rows[0];
}
async function getBrandById(brandId) {
  const { rows } = await pool.query(
    `
        SELECT * FROM brands WHERE id = $1
`,
    [brandId],
  );
  return rows[0];
}
async function getTypeByName(typeName) {
  const { rows } = await pool.query(
    `
    SELECT * FROM types WHERE name = $1
`,
    [typeName],
  );
  return rows[0];
}

async function getBrandByName(brandName) {
  const { rows } = await pool.query(
    `
    SELECT * FROM brands WHERE name = $1
`,
    [brandName],
  );
  return rows[0];
}
async function insertCar(carInfo) {
  console.log("inserted", carInfo);
  await pool.query(
    `
    INSERT INTO cars (model, year, price, type_id, brand_id)
    VALUES($1, $2, $3, $4, $5 )
`,
    [
      carInfo.model,
      carInfo.year,
      carInfo.price,
      carInfo.type_id,
      carInfo.brand_id,
    ],
  );
}
async function insertType(name) {
  await pool.query(
    `
    INSERT INTO types (name) VALUES($1)
`,
    [name],
  );
}

async function insertBrand(name) {
  await pool.query(
    `
    INSERT INTO brands (name) VALUES($1)
`,
    [name],
  );
}

async function updateCar(carInfo) {
  await pool.query(
    `
    UPDATE cars
    SET model = $2 , year = $3 , price = $4 , type_id = $5 , brand_id = $6 
    WHERE id = $1
    RETURNING *;
`,
    [
      carInfo.carId,
      carInfo.model,
      carInfo.year,
      carInfo.price,
      carInfo.type_id,
      carInfo.brand_id,
    ],
  );
}
async function updateType(name, typeId) {
  await pool.query(
    `
        UPDATE types
        SET name = $1
        WHERE id = $2
`,
    [name, typeId],
  );
}

async function updateBrand(name, brandId) {
  await pool.query(
    `
        UPDATE brands
        SET name = $1
        WHERE id =$2
`,
    [name, brandId],
  );
}

async function deleteCar(carId) {
  await pool.query(
    `
    DELETE from cars 
    WHERE id = $1 

`,
    [carId],
  );
}
async function deleteType(typeId) {
  await pool.query(
    `
    DELETE from types 
    WHERE id = $1 

`,
    [typeId],
  );
}
async function deleteBrand(brandId) {
  await pool.query(
    `
    DELETE from brands 
    WHERE id = $1 

`,
    [brandId],
  );
}
module.exports = {
  getAllTypes,
  getAllBrands,
  getCarsByTypeId,
  getCarsByBrandId,
  getCarById,
  getTypeById,
  getBrandById,
  insertCar,
  getTypeByName,
  getBrandByName,
  insertType,
  insertBrand,
  updateCar,
  updateType,
  updateBrand,
  deleteCar,
  deleteType,
  deleteBrand,
};
