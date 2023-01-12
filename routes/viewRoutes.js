const viewController = require('../controllers/viewController');
const express = require('express');


const router = express.Router();

// Global
router.get('/', viewController.getHomePage);



module.exports = router;