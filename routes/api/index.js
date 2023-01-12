const express = require("express");
const router = express.Router();
const { verify } = require("../../middlewares/authMiddleware");

const apiKeysController = require('../../controllers/ApiKeysControllers');
const PaymentsController = require('../../controllers/PaymentsController');

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./usersRoutes'));
router.use('/api-keys', verify, apiKeysController);
router.use('/payments', verify, PaymentsController);

module.exports = router;