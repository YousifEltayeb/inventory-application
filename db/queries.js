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

module.exports = {
  getAllTypes,
  getAllBrands,
  getCarsByTypeId,
  getCarsByBrandId,
};
