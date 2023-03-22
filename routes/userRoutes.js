const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/deconnexion', authController.logout);

// router.post('/forgotPassword', authController.forgotPassword);

// router.patch('/updateMyPassword', authController.protect, authController.updatePassword);


router
	.route('/')
	.get(authController.protect, authController.restrictTo('Admin'), userController.getAllUsers)
	.post(authController.protect, authController.restrictTo('Admin'), userController.createUser);

router
	.route('/:id')
	.get(authController.protect, authController.restrictTo('Admin'), userController.getUser)
	.patch(authController.protect, authController.restrictTo('Admin'), userController.updateUser)
	.delete(authController.protect, authController.restrictTo('Admin'), userController.deleteUser);


module.exports = router;