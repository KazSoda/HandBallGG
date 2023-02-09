const viewController = require('../controllers/viewController');
const express = require('express');


const router = express.Router();

// Global
router.get('/', viewController.getHomePage);

router.get('/equipes', viewController.getEquipesPage);

router.get('/partenaires', viewController.getPartners);

module.exports = router;