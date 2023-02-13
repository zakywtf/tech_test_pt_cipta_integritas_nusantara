const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');

// Routes Public
router.get('/', IndexController.index);
router.get('/service/:category', IndexController.service);
router.get('/career', IndexController.career);
router.get('/book-appointment', IndexController.book_appointment);
router.get('/service/detail/:title', IndexController.detail_service);
router.get('/blog', IndexController.blog);


// Routes Test
router.get('/ping', IndexController.ping);
router.get('/ping', IndexController.ping);
router.get('/rand-string', IndexController.randString);
// router.get('/payment', IndexController.testPayment);
router.get('/contact_us', IndexController.contactUs);


// Routes Prefixes / API
router.use('/api/v1', require('./api/index'));

// Routes Web
router.use('/web/v1', require('./web/index'));


module.exports = router;
