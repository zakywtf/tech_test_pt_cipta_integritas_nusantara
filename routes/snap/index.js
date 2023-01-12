const express = require("express");
const router = express.Router();
const { verify } = require("../../middlewares/authMiddleware");
const { reduceLimits } = require("../../middlewares/reduceLimits");
const { callbackMiddleware } = require("../../middlewares/callbackMiddleware");

const apiKeysController = require('../../controllers/ApiKeysControllers');
const PaymentsController = require('../../controllers/PaymentsController');

// router.use('/auth', require('./authRoutes'));
// router.use('/users', require('./usersRoutes'));
// router.use('/api-keys', verify, apiKeysController);
router.use('/payments', reduceLimits, PaymentsController);
router.use('/callback', callbackMiddleware, PaymentsController);

module.exports = router;