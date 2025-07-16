const { Router } = require("express");
const carsRouter = Router();
const carsController = require("../controllers/carsController");

carsRouter.get("/new", carsController.getNewCarForm);
carsRouter.post("/new", carsController.postNewCarForm);
carsRouter.get("/:carId/update", carsController.getUpdateCarForm);
carsRouter.post("/:carId/update", carsController.postUpdateCar);

module.exports = carsRouter;
