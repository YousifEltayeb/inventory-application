const db = require("../db/queries");
const { validateType, validationResult } = require("./validation");
const CustomNotFoundError = require("../errors/customNotFoundError");

exports.getAllTypes = async (req, res) => {
  const result = await db.getAllTypes();
  res.render("viewCategories", { title: "Types", categories: result });
};
exports.getAllCarsByTypeId = async (req, res) => {
  const { typeId } = req.params;
  const result = await db.getCarsByTypeId(typeId);

  // result will always return an array, checking if the array empty
  if (!result[0]) {
    throw new CustomNotFoundError("Type not found or not cars under this type");
  }
  res.render("cars", { title: "Cars", cars: result });
};

exports.getNewTypeForm = (req, res) => {
  res.render("createType");
};

exports.getUpdateTypeForm = async (req, res) => {
  const { typeId } = req.params;
  const type = await db.getTypeById(typeId);
  if (!type) {
    throw new CustomNotFoundError("Type not found");
  }
  res.render("updateType", { type: type });
};

exports.postNewType = [
  validateType,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("createType", {
        errors: errors.array(),
      });
    }

    const { name } = req.body;
    await db.insertType(name);
    res.redirect("/");
  },
];

exports.postUpdateType = [
  validateType,
  async (req, res) => {
    const errors = validationResult(req);
    const { typeId } = req.params;
    const type = await db.getTypeById(typeId);
    if (!type) {
      throw new CustomNotFoundError("Type not found");
    }
    if (!errors.isEmpty()) {
      return res.status(400).render("updateType", {
        type: type,
        errors: errors.array(),
      });
    }
    const { name } = req.body;
    await db.updateType(name, typeId);
    res.redirect("/");
  },
];
