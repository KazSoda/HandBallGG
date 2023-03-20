const express = require('express');
const matchController = require('../controllers/matchController');

const router = express.Router();


router.get('/ics', matchController.getICS)

router
    .route('/')
    .get(matchController.getAllMatch)
    .post(matchController.createMatch)

router
    .route('/:id')
    .get(matchController.getOneMatch)
    .patch(matchController.updateMatch)
    .delete(matchController.deleteMatch)



module.exports = router;