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
  const { rows } = await pool.query("SELECT * FROM cars WHERE brand_id = $1", [
    brandId,
  ]);
  return rows;
}

async function getCarsByTypeId(typeId) {
  const { rows } = await pool.query("SELECT * FROM cars WHERE type_id = $1", [
    typeId,
  ]);
  return rows;
}

module.exports = {
  getAllTypes,
  getAllBrands,
  getCarsByBrandId,
  getCarsByTypeId,
};
