const express = require('express');
const equipeController = require('../controllers/equipeController');

const router = express.Router();

// Global
router
    .route('/')
    .get(equipeController.getAllEquipes)
    .post(equipeController.createEquipe);




module.exports = router;