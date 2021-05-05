const router = require('express').Router();

const ReviewsController = require('../controllers/reviews.js');

const checkAuthMiddleware = require('../middleware/check-auth.js');


router.get('/readallreviews', ReviewsController.readAllReviews);

router.get('/readreviewsbybusiness', ReviewsController.readReviewsByBusiness);

router.get('/readreviewsbystars', ReviewsController.readReviewsByStars);

router.get('/readreviewsbyuser', ReviewsController.readReviewsByUser);

router.get('/readreviewsbylanguage', ReviewsController.readReviewsByLanguage);

router.post('/createreview', checkAuthMiddleware.checkAuth, ReviewsController.createReview);

router.get('/deletereview', checkAuthMiddleware.checkAuth, ReviewsController.deleteReview);

router.patch('/updatetextinreview', checkAuthMiddleware.checkAuth, ReviewsController.updateTextInReview);

router.patch('/updatestarsinreview', checkAuthMiddleware.checkAuth, ReviewsController.updateStarsInReview);

router.patch('/updatelikeinreview', checkAuthMiddleware.checkAuth, ReviewsController.updateLikeInReview);


module.exports = router;