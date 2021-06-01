const router = require("express").Router();

const ReviewsController = require("../controllers/reviews.js");

const checkAuthMiddleware = require("../middleware/check-auth.js");
const parseListParameters = require("../middleware/parse-list-params");

router.get("/reviews", parseListParameters, ReviewsController.getAll);
router.get("/reviews/:id", ReviewsController.getOne);

router.post(
  "/reviews",
  checkAuthMiddleware.checkAuth,
  ReviewsController.create
);

router.delete(
  "/reviews/:id",
  checkAuthMiddleware.checkAuth,
  ReviewsController.deleteReview
);

router.put(
  "/reviews/:id",
  checkAuthMiddleware.checkAuth,
  ReviewsController.update
);

module.exports = router;
