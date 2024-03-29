const express = require('express');
const userDashboardController = require('../controllers/userDashboard');
const router = express.Router();

router.post('/user/dashboard', userDashboardController.userDashboard);
router.post('/user/instant/book', userDashboardController.bookStation);
// router.post('/createuser', generateTokenController.createUser);

module.exports = router;
