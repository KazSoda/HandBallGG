const viewController = require('../controllers/viewController');
const express = require('express');
const authController = require('../controllers/authController');


const router = express.Router();

// Global
router.get('/', authController.isLoggedIn, viewController.getHomePage);

router.get('/actualites', authController.isLoggedIn, viewController.getNewsPage);


router.get('/presentation', authController.isLoggedIn, viewController.getPresentationPage);
router.get('/historique', authController.isLoggedIn, viewController.getHistoryPage);
router.get('/partenaires', authController.isLoggedIn, viewController.getPartners);


router.get('/equipes', authController.isLoggedIn, viewController.getEquipesPage);


router.get('/matchs', authController.isLoggedIn, viewController.getMatchsPage);

router.get('/boutique', authController.isLoggedIn, viewController.getShopPage);


router.get('/inscriptions', authController.isLoggedIn, viewController.getJoinUsPage);
router.get('/entrainements', authController.isLoggedIn, viewController.getTrainingPage);
router.get('/planningBenevoles', authController.isLoggedIn, viewController.getPlanningBenevolesPage);
router.get('/contact', authController.isLoggedIn, viewController.getContactPage);

/*Utilisateurs*/
router.get('/utilisateurs', authController.isLoggedIn, viewController.getUsersPage);
router.get('/creationUtilisateur', authController.isLoggedIn, viewController.getCreationUser);

router.get('/connexion', authController.isLoggedIn, viewController.getConnexionPage);

module.exports = router;