const express = require('express');
const AuthController = require('../../controllers/AuthController');
const validation = require('../../controllers/Validation');
const {verify} = require("../../middlewares/authMiddleware");
const imageUpload = require("../../helpers/s3Uploader");

const router = express.Router();

router.post('/register', imageUpload, validation.validate('register-customer'), AuthController.register);
router.post('/login', validation.validate('login'), AuthController.login);
router.put('/change_password', verify, validation.validate('change_pass'), AuthController.change_pass);

module.exports = router;