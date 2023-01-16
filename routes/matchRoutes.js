const express = require('express');
const matchController = require('../controllers/matchController');

const router = express.Router();

router
    .route('/')
    .get(matchController.getAllMatch)
    .post(matchController.createMatch)

module.exports = router;