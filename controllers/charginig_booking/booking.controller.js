const bookingModel = require("../../models/charging_booking/booking.model");
const {responseCode, responseDeliver, verifyToken, ADMIN_USER_ID} = require("../../services/static.service");


exports.createBooking = (req, res) => {

    verifyToken(req).catch(error => {
        res.status(401).json(responseDeliver(responseCode.FAIL, "Token verification failed", "", error))
    }).then(data => {
        if (data !== undefined) {
            let user_id = data.data[0]
            let {station_id, v_type, payment_mode, status, slot_id, start_time, end_time, remark} = req.body
            console.log("req body ", req.body)
            bookingModel.createBooking({
                user_id, station_id, v_type, payment_mode, status, slot_id, start_time, end_time, remark
            }).then(response => {
                if (response.status === responseCode.SUCCESS) res.status(200).json(response); else res.status(400).json(response);
            }).catch(error => {
                res.status(400).json(error);
            })
        }
    })
}

exports.getUserCurrentBooking = (req, res) => {

    verifyToken(req).catch(error => {
        res.status(401).json(responseDeliver(responseCode.FAIL, "Token verification failed", "", error))
    }).then(data => {
        if (data !== undefined) {
            let user_id = data.data[0]
            console.log("req body ", req.body)
            bookingModel.getUserCurrentBooking({user_id})
                .then(response => {
                    if (response.status === responseCode.SUCCESS) res.status(200).json(response); else res.status(400).json(response);
                }).catch(error => {
                res.status(400).json(error);
            })
        }
    })
}

exports.getAllCurrentBooking = (req, res) => {

    verifyToken(req).catch(error => {
        res.status(401).json(responseDeliver(responseCode.FAIL, "Token verification failed", "", error))
    }).then(data => {
        if (data !== undefined) {
            let user_id = data.data[0]
            if (user_id === ADMIN_USER_ID){

                console.log("req body ", req.body)

                bookingModel.getAllCurrentBooking()
                    .then(response => {
                        if (response.status === responseCode.SUCCESS) res.status(200).json(response); else res.status(400).json(response);
                    }).catch(error => {
                    res.status(400).json(error);
                })
            }else{
                res.status(400).json(responseDeliver(responseCode.FAIL, "Access Denied", ""))
            }
        }
    })
}
