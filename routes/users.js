const router = require('express').Router();

const UsersController = require('../controllers/users.js');
const AuthController = require('../controllers/auth.js');

const checkAuthMiddleware = require('../middleware/check-auth.js');


router.post('/login', AuthController.login);

router.post('/token', AuthController.token);

router.delete('/logout', AuthController.logout);

router.get('/readallusers', checkAuthMiddleware.checkAuth, UsersController.readAllUsers);

router.get('/readuser', checkAuthMiddleware.checkAuth, UsersController.readUser);

router.post('/createuser', UsersController.createUser);

router.get('/deleteuser', checkAuthMiddleware.checkAuth, UsersController.deleteUser);

router.patch('/updateprofilepictureinuser', checkAuthMiddleware.checkAuth, UsersController.updateProfilePictureInUser);

router.patch('/updatecountryinuser', checkAuthMiddleware.checkAuth, UsersController.updateCountryInUser);

router.patch('/updatecityinuser', checkAuthMiddleware.checkAuth, UsersController.updateCityInUser);


module.exports = router;