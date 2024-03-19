const express = require("express")
const bookingController = require("../../controllers/charginig_booking/booking.controller");

const router = express.Router()

router.post("/create-booking", bookingController.createBooking);

module.exports = router;
