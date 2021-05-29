const router = require("express").Router();

const BusinessController = require("../controllers/business.js");

const checkAuthMiddleware = require("../middleware/check-auth.js");
const parseListParameters = require("../middleware/parse-list-params");

router.get("/businesses", parseListParameters, BusinessController.getAll);

router.get("/businesses/:id", BusinessController.getOne);

router.post(
  "/businesses",
  checkAuthMiddleware.checkAuth,
  BusinessController.create
);

router.delete(
  "/businesses/:id",
  checkAuthMiddleware.checkAuth,
  BusinessController.deleteBusiness
);

router.put(
  "/businesses/:id",
  checkAuthMiddleware.checkAuth,
  BusinessController.update
);

module.exports = router;
