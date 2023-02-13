const express = require("express");
const router = express.Router();

// WEB ROUTES
router.use('/book-appointment', require('./bookAppointmenrRoutes'));
router.use('/subscribe', require('./subscribeRoutes'));


module.exports = router;