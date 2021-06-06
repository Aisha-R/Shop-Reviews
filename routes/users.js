const router = require("express").Router();

const UsersController = require("../controllers/users.js");
const AuthController = require("../controllers/auth.js");

const checkAuthMiddleware = require("../middleware/check-auth.js");
const parseListParameters = require("../middleware/parse-list-params");

router.post("/login", AuthController.login);

router.delete("/logout", AuthController.logout);

router.get(
  "/users",
  checkAuthMiddleware.checkAuth,
  parseListParameters,
  UsersController.getAll
);

router.get("/users/me", checkAuthMiddleware.checkAuth, UsersController.getSelf);
router.get("/users/:id", checkAuthMiddleware.checkAuth, UsersController.getOne);

router.post("/users", UsersController.createUser);

router.delete(
  "/users/:id",
  checkAuthMiddleware.checkAuth,
  UsersController.deleteUser
);

router.patch(
  "/updateprofilepictureinuser",
  checkAuthMiddleware.checkAuth,
  UsersController.updateProfilePictureInUser
);

router.patch(
  "/updatecountryinuser",
  checkAuthMiddleware.checkAuth,
  UsersController.updateCountryInUser
);

router.patch(
  "/updatecityinuser",
  checkAuthMiddleware.checkAuth,
  UsersController.updateCityInUser
);

module.exports = router;
