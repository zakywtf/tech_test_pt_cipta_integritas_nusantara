const express = require('express');
const controller = require('../../controllers/UsersController');
// const auth = require("../../middlewares/jwt");
const { verify } = require("../../middlewares/authMiddleware");
const router = express.Router();

router.get('/', verify, controller);

module.exports = router;