const viewController = require('../controllers/viewController');
const express = require('express');


const router = express.Router();

// Global
router.get('/', viewController.getHomePage);

router.get('/actualites', viewController.getNewsPage);


router.get('/presentation', viewController.getPresentationPage);
router.get('/historique', viewController.getHistoryPage);
router.get('/partenaires', viewController.getPartners);


router.get('/equipes', viewController.getEquipesPage);


router.get('/matchs', viewController.getMatchsPage);


router.get('/boutique', viewController.getShopPage);


router.get('/inscriptions', viewController.getJoinUsPage);
router.get('/entrainements', viewController.getTrainingPage);
router.get('/planningBenevoles' , viewController.getPlanningBenevolesPage);
router.get('/contact', viewController.getContactPage);


router.get('/connexion', viewController.getConnexionPage);

module.exports = router;