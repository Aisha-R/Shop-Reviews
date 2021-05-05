const router = require('express').Router();

const BusinessController = require('../controllers/business.js');

const checkAuthMiddleware = require('../middleware/check-auth.js');


router.get('/readallbusinesses', BusinessController.readAllBusinesses);

router.get('/readbusiness/:id', BusinessController.readBusiness);

router.post('/createbusiness', checkAuthMiddleware.checkAuth, BusinessController.createBusiness);

router.get('/deletebusiness', checkAuthMiddleware.checkAuth, BusinessController.deleteBusiness);

router.patch('/updatetitleinbusiness', checkAuthMiddleware.checkAuth, BusinessController.updateTitleInBusiness);

router.patch('/updatedescriptioninbusiness', checkAuthMiddleware.checkAuth, BusinessController.updateDescriptionInBusiness);

router.patch('/updateemailinbusiness', checkAuthMiddleware.checkAuth, BusinessController.updateEmailInBusiness);

router.patch('/updatephonenumberinbusiness', checkAuthMiddleware.checkAuth, BusinessController.updatePhoneNumberInBusiness);

router.patch('/updatewebsiteinbusiness', checkAuthMiddleware.checkAuth, BusinessController.updateWebsiteInBusiness);


module.exports = router;