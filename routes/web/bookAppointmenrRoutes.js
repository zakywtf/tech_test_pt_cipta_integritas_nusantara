const express = require('express');
const controller = require('../../controllers/BookAppointmentController');
// const auth = require("../../middlewares/jwt");
const { verify } = require("../../middlewares/authMiddleware");
const router = express.Router();

router.post('/save', controller);

module.exports = router;