const { Router } = require("express");
const typesRouter = Router();
const typesController = require("../controllers/typesController");
typesRouter.get("/", typesController.getAllTypes);
typesRouter.get("/new", typesController.getNewTypeForm);
typesRouter.post("/new", typesController.postNewType);
typesRouter.get("/:typeId/update", typesController.getUpdateTypeForm);
typesRouter.post("/:typeId/update", typesController.postUpdateType);
typesRouter.post("/:typeId/delete", typesController.deleteType);
typesRouter.get("/:typeId", typesController.getAllCarsByTypeId);

module.exports = typesRouter;
