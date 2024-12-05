const express = require('express');
const router = express.Router();
const scheduleController = require('../Controller/Controller');

// Create appointment
router.post('/', scheduleController.createAppointment);

// Get available times
router.get('/', scheduleController.getAvailableTimes);

module.exports = router;