const { Router } = require("express");
const carsRouter = Router();
const carsController = require("../controllers/carsController");
carsRouter.get("/new", carsController.getNewCarForm);

module.exports = carsRouter;
