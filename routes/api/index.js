const express = require("express");
const router = express.Router();
const { verify } = require("../../middlewares/authMiddleware");

router.use('/auth', require('./authRoutes'));

module.exports = router;