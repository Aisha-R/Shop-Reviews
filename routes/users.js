const router = require('express').Router();

const UsersController = require('../controllers/users.js');
const AuthController = require('../controllers/auth.js');

const checkAuthMiddleware = require('../middleware/check-auth.js');

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Authentication management
 */

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Login user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             email:
 *              type: string
 *             password:
 *              type: string
 *            example:
 *              email: test@gmail.com
 *              password: password
 *    responses:
 *      200:
 *        description: Successful operation
 */
router.post('/login', AuthController.login);

router.post('/token', AuthController.token);

router.delete('/logout', AuthController.logout);

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management
 */

/**
 * @swagger
 * /readallusers:
 *  get:
 *    summary: Retrieve all users
 *    description: Returns a list of all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: All users
 */

router.get('/readallusers', checkAuthMiddleware.checkAuth, UsersController.readAllUsers);

router.get('/readuser', checkAuthMiddleware.checkAuth, UsersController.readUser);

/**
 * @swagger
 * /createuser:
 *  post:
 *    summary: Create a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             firsName:
 *              type: string          
 *             lastName:
 *              type: string
 *             email:
 *              type: string
 *             password:
 *              type: string
 *            example:
 *              firstName: John
 *              lastName: Doe
 *              email: fake@email.com
 *              password: password
 *    responses:
 *      201:
 *        description: Created new user
 */
router.post('/createuser', UsersController.createUser);

router.get('/deleteuser', checkAuthMiddleware.checkAuth, UsersController.deleteUser);

router.patch('/updateprofilepictureinuser', checkAuthMiddleware.checkAuth, UsersController.updateProfilePictureInUser);

router.patch('/updatecountryinuser', checkAuthMiddleware.checkAuth, UsersController.updateCountryInUser);

router.patch('/updatecityinuser', checkAuthMiddleware.checkAuth, UsersController.updateCityInUser);


module.exports = router;
