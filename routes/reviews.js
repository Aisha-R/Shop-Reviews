const router = require('express').Router();

const ReviewsController = require('../controllers/reviews.js');

const checkAuthMiddleware = require('../middleware/check-auth.js');

router.get('/readallreviews', ReviewsController.readAllReviews);

router.post('/readreviewsbybusiness', ReviewsController.readReviewsByBusiness);

router.post('/readreviewsbystars', ReviewsController.readReviewsByStars);

router.post('/readreviewsbyuser', ReviewsController.readReviewsByUser);

router.post('/readreviewsbylanguage', ReviewsController.readReviewsByLanguage);

router.post('/createreview', checkAuthMiddleware.checkAuth, ReviewsController.createReview);

router.delete('/deletereview', checkAuthMiddleware.checkAuth, ReviewsController.deleteReview);

router.patch('/updatetextinreview', checkAuthMiddleware.checkAuth, ReviewsController.updateTextInReview);

router.patch('/updatestarsinreview', checkAuthMiddleware.checkAuth, ReviewsController.updateStarsInReview);

router.patch('/updatelikeinreview', checkAuthMiddleware.checkAuth, ReviewsController.updateLikeInReview);


module.exports = router;