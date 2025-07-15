const db = require("../db/queries");
const CustomNotFoundError = require("../errors/customNotFoundError");
exports.getAllBrands = async (req, res) => {
  const result = await db.getAllBrands();
  res.send(result);
};
exports.getAllCarsByBrandId = async (req, res) => {
  const { brandId } = req.params;
  const result = await db.getCarsByBrandId(brandId);
  if (!result[0]) {
    throw new CustomNotFoundError("Brand not found");
  }
  res.send(result);
};
exports.getNewBrandForm = (req, res) => {
  res.render("createBrand");
};
exports.postNewBrand = async (req, res) => {
  res.send(req.body);
};
