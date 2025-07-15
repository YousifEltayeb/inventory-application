const db = require("../db/queries");
const CustomNotFoundError = require("../errors/customNotFoundError");

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
  console.log(car);
  if (!car) {
    throw new CustomNotFoundError("Car not found");
  }
  res.render("updateCar", { types: types, brands: brands, car: car });
};
