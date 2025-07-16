const db = require("../db/queries");
const CustomNotFoundError = require("../errors/customNotFoundError");
const { validateCar, validationResult } = require("./validation.js");
exports.getNewCarForm = async (req, res) => {
  const types = await db.getAllTypes();
  const brands = await db.getAllBrands();
  res.render("createCar", { types: types, brands: brands });
};

exports.getUpdateCarForm = async (req, res) => {
  const { carId } = req.params;
  const types = await db.getAllTypes();
  const brands = await db.getAllBrands();
  const car = await db.getCarById(carId);
  if (!car) {
    throw new CustomNotFoundError("Car not found");
  }
  res.render("updateCar", { types: types, brands: brands, car: car });
};

exports.postNewCarForm = [
  validateCar,
  async (req, res) => {
    const errors = validationResult(req);

    const types = await db.getAllTypes();
    const brands = await db.getAllBrands();

    if (!errors.isEmpty()) {
      return res.status(400).render("createCar", {
        types: types,
        brands: brands,
        errors: errors.array(),
      });
    }

    const { model, year, price, type, brand } = req.body;
    // make sure the type and brand exist
    const typeObj = await db.getTypeByName(type);
    const brandObj = await db.getBrandByName(brand);
    if (!typeObj || !brandObj) {
      throw new CustomNotFoundError("Type or brand not found");
    }
    const type_id = typeObj.id;
    const brand_id = brandObj.id;
    await db.insertCar({
      model,
      year,
      price,
      type_id,
      brand_id,
    });
    res.redirect("/");
  },
];

exports.postUpdateCar = [
  validateCar,
  async (req, res) => {
    const errors = validationResult(req);
    const { carId } = req.params;
    const car = await db.getCarById(carId);
    const types = await db.getAllTypes();
    const brands = await db.getAllBrands();

    const { model, year, price, type, brand } = req.body;
    console.log({ model, year, price, type, brand });
    if (!errors.isEmpty()) {
      return res.status(400).render("updateCar", {
        types: types,
        brands: brands,
        car: car,
        errors: errors.array(),
      });
    }
    if (!car) {
      throw new CustomNotFoundError("Car not found");
    }
    const typeObj = await db.getTypeByName(type);
    const brandObj = await db.getBrandByName(brand);
    if (!typeObj || !brandObj) {
      throw new CustomNotFoundError("Type or brand not found");
    }
    const type_id = typeObj.id;
    const brand_id = brandObj.id;
    await db.updateCar({
      carId,
      model,
      year,
      price,
      type_id,
      brand_id,
    });
    res.redirect("/");
  },
];
