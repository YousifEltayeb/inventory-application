const db = require("../db/queries");
const CustomNotFoundError = require("../errors/customNotFoundError");

exports.getNewCarForm = async (req, res) => {
  const types = await db.getAllTypes();
  const brands = await db.getAllBrands();
  res.render("createCar", { types: types, brands: brands });
};
