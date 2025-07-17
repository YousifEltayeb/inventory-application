const db = require("../db/queries");
const { validateBrand, validationResult } = require("./validation");
const CustomNotFoundError = require("../errors/customNotFoundError");
exports.getAllBrands = async (req, res) => {
  const result = await db.getAllBrands();
  res.render("viewCategories", { title: "Brands", categories: result });
};
exports.getAllCarsByBrandId = async (req, res) => {
  const { brandId } = req.params;
  const result = await db.getCarsByBrandId(brandId);
  if (!result[0]) {
    throw new CustomNotFoundError(
      "Brand not found or no cars under this brand",
    );
  }
  res.render("cars", { title: "Cars", cars: result });
};
exports.getNewBrandForm = (req, res) => {
  res.render("createBrand");
};
exports.getUpdateBrandForm = async (req, res) => {
  const { brandId } = req.params;
  const brand = await db.getBrandById(brandId);
  if (!brand) {
    throw new CustomNotFoundError("Brand not found");
  }
  res.render("updateBrand", { brand: brand });
};

exports.postNewBrand = [
  validateBrand,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("createType", {
        errors: errors.array(),
      });
    }

    const { name } = req.body;
    await db.insertBrand(name);
    res.redirect("/");
  },
];
exports.postUpdateBrand = [
  validateBrand,
  async (req, res) => {
    const errors = validationResult(req);
    const { brandId } = req.params;
    const brand = await db.getTypeById(brandId);
    if (!brand) {
      throw new CustomNotFoundError("brand not found");
    }
    if (!errors.isEmpty()) {
      return res.status(400).render("updateBrand", {
        brand: brand,
        errors: errors.array(),
      });
    }
    const { name } = req.body;
    await db.updateBrand(name, brandId);
    res.redirect("/");
  },
];
exports.deleteBrand = async (req, res) => {
  const { brandId } = req.params;
  const cars = await db.getCarsByBrandId(brandId);
  if (cars[0]) {
    throw new CustomNotFoundError(
      "Only empty brands can be deleted. Delete all cars under it first",
    );
  }
  await db.deleteBrand(brandId);
  res.redirect("/");
};
