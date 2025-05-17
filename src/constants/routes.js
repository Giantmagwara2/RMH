const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const tripController = require('../controllers/tripController');

// Auth routes
router.post('/signup', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], authController.signup);
router.post('/login', authController.login);

// Trip routes (example, requires authentication middleware)
router.post('/trips', /* authMiddleware, */ tripController.createTrip);
router.get('/trips', /* authMiddleware, */ tripController.getTrips);

module.exports = router;