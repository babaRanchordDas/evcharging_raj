const express = require('express');
const generateTokenController = require('../../controllers/station/charging_station.controller');
const router = express.Router();

router.post('/direct-create-station', generateTokenController.directCreateChargingStation);

router.post('/station-by-code', generateTokenController.getChargingStationByCode);
router.post('/station-by-user', generateTokenController.getChargingStationByUser);
router.post('/station', generateTokenController.getChargingStations);
router.post('/create_station', generateTokenController.createChargingStation);
router.post('/update_station', generateTokenController.updateChargingStation);


module.exports = router;