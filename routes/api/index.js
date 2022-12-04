const express = require("express");
const router = express.Router();
const { verify } = require("../../middlewares/authMiddleware");

const positionController = require('../../controllers/PositionsController');
const employeeController = require('../../controllers/EmployeesController');
const sallaryController = require('../../controllers/SallarysController');

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./usersRoutes'));
router.use('/positions', verify, positionController);
router.use('/employees', verify, employeeController);
router.use('/sallarys', verify, sallaryController);

module.exports = router;