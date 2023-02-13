const express = require("express");
const router = express.Router();

// WEB ROUTES
router.use('/book-appointment', require('./bookAppointmenrRoutes'));


module.exports = router;