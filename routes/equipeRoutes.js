const express = require('express');
const equipeController = require('../controllers/equipeController');
const authController = require('../controllers/authController');

const router = express.Router();

// Global
router
    .route('/')
    .get(equipeController.getAllEquipes)
    .post(authController.protect, equipeController.createEquipe);

router
    .route('/:id')
    .get(equipeController.getOneEquipe)
    .patch(authController.protect, equipeController.uploadEquipePhoto, equipeController.resizeEquipePhoto, equipeController.updateEquipe)
    .delete(authController.protect, equipeController.delEquipe)


module.exports = router;