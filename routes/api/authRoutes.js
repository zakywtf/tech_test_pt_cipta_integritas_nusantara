const express = require('express');
const AuthController = require('../../controllers/AuthController');
const validation = require('../../controllers/Validation');
const {verify} = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', verify, AuthController.me);

module.exports = router;