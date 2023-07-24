const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');

// Routes Test
router.get('/ping', IndexController.ping);
router.get('/ping', IndexController.ping);
router.get('/rand-string', IndexController.randString);


// Routes Prefixes / API
router.use('/api/v1', require('./api/index'));



module.exports = router;
