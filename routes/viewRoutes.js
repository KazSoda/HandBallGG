const viewController = require('../controllers/viewController');
const express = require('express');
const authController = require('../controllers/authController');


const router = express.Router();

// Global
router.get('/', authController.isLoggedIn, viewController.getHomePage);

router.get('/actualites', viewController.getNewsPage);


router.get('/presentation', viewController.getPresentationPage);
router.get('/historique', viewController.getHistoryPage);
router.get('/partenaires', viewController.getPartners);


router.get('/equipes', authController.isLoggedIn, viewController.getEquipesPage);


router.get('/matchs', viewController.getMatchsPage);

router.get('/boutique', viewController.getShopPage);


router.get('/inscriptions', viewController.getJoinUsPage);
router.get('/entrainements', viewController.getTrainingPage);
router.get('/planningBenevoles', viewController.getPlanningBenevolesPage);
router.get('/contact', viewController.getContactPage);

/*Utilisateurs*/
router.get('/utilisateurs', viewController.getUsersPage);
router.get('/creationUtilisateur', viewController.getCreationUser);

router.get('/connexion', viewController.getConnexionPage);

module.exports = router;