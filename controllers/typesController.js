const db = require("../db/queries");
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
    throw new CustomNotFoundError("Type not found");
  }
  res.render("cars", { title: "Cars", cars: result });
};

exports.getNewTypeForm = (req, res) => {
  res.render("createType");
};

exports.postNewType = async (req, res) => {
  console.log(req.body);
  res.end();
};
exports.getUpdateTypeForm = async (req, res) => {
  const { typeId } = req.params;
  const type = await db.getTypeById(typeId);
  if (!type) {
    throw new CustomNotFoundError("Type not found");
  }
  res.render("updateType", { type: type });
};
