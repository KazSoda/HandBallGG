const express = require('express');
const equipeController = require('../controllers/equipeController');


const router = express.Router();

// Global
router
    .route('/')
    .get(equipeController.getAllEquipes)
    .post(equipeController.createEquipe);

router
    .route('/:id')
    .get(equipeController.getOneEquipe)
    .patch(equipeController.uploadEquipePhoto, equipeController.resizeEquipePhoto, equipeController.updateEquipe)
    .delete(equipeController.delEquipe)


module.exports = router;