const viewController = require('../controllers/viewController');
const express = require('express');
const authController = require('../controllers/authController');


const router = express.Router();

// Global
router.get('/', authController.isLoggedIn, viewController.getHomePage);



router.get('/presentation', authController.isLoggedIn, viewController.getPresentationPage);
router.get('/partenaires', authController.isLoggedIn, viewController.getPartners);


router.get('/equipes', authController.isLoggedIn, viewController.getEquipesPage);


router.get('/matchs', authController.isLoggedIn, viewController.getMatchsPage);
router.get('/matchsCalendrier', authController.isLoggedIn, viewController.getMatchsCalendarPage);



/*Utilisateurs*/
router.get('/utilisateurs', authController.isLoggedIn, authController.protect, authController.restrictTo('Admin'), viewController.getUsersPage);
router.get('/creationUtilisateur', authController.isLoggedIn, viewController.getCreationUser);

router.get('/connexion', authController.isLoggedIn, viewController.getConnexionPage);

module.exports = router;