const db = require("../db/queries");
const CustomNotFoundError = require("../errors/customNotFoundError");
exports.getAllTypes = async (req, res) => {
  const result = await db.getAllTypes();
  res.send(result);
};
exports.getAllCarsByTypeId = async (req, res) => {
  const { typeId } = req.params;
  const result = await db.getCarsByTypeId(typeId);

  // result will always return an array, checking if the array empty
  if (!result[0]) {
    throw new CustomNotFoundError("Type not found");
  }
  res.send(result);
};

exports.getNewTypeForm = (req, res) => {
  res.render("createType");
};

exports.postNewType = async (req, res) => {
  console.log(req.body);
  res.end();
};
