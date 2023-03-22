const express = require('express');
const matchController = require('../controllers/matchController');
const authController = require('../controllers/authController');

const router = express.Router();


router.get('/ics', matchController.getICS)

router
    .route('/')
    .get(matchController.getAllMatch)
    .post(authController.protect, matchController.createMatch)

router
    .route('/:id')
    .get(matchController.getOneMatch)
    .patch(authController.protect, matchController.updateMatch)
    .delete(authController.protect, matchController.deleteMatch)



module.exports = router;