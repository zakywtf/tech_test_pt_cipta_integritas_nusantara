const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');

const { reduceLimits } = require("../middlewares/reduceLimits");

router.get('/', IndexController.index);
router.get('/ping', IndexController.ping);
router.get('/ping', IndexController.ping);
router.get('/rand-string', IndexController.randString);
// router.get('/payment', IndexController.testPayment);
router.get('/contact_us', IndexController.contactUs);

// Routes Prefixes
router.use('/api/v1', require('./api/index'));
router.use('/snap/v1', require('./snap/index'));


module.exports = router;
