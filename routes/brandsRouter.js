const { Router } = require("express");
const brandsRouter = Router();
const brandsController = require("../controllers/brandsController");

brandsRouter.get("/", brandsController.getAllBrands);
brandsRouter.get("/new", brandsController.getNewBrandForm);
brandsRouter.post("/new", brandsController.postNewBrand);
brandsRouter.get("/:brandId/update", brandsController.getUpdateBrandForm);
brandsRouter.post("/:brandId/update", brandsController.postUpdateBrand);
brandsRouter.post("/:brandId/delete", brandsController.deleteBrand);
brandsRouter.get("/:brandId", brandsController.getAllCarsByBrandId);

module.exports = brandsRouter;
