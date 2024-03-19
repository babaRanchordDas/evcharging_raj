const {pgTables} = require("../../cred/env");
const {pgClient} = require("../../cred/pg.connection");
const {responseDeliver, responseCode, handelErrorResponse} = require("../../services/static.service");


exports.createBooking = (reqData) => {
    let {user_id, station_id, v_type, payment_mode, status, slot_id, start_time, end_time, remark} = reqData

    return new Promise(async (resolve, reject) => {
        try {
            let result = await pgClient(pgTables.booking)
                .insert({
                    user_id, station_id, v_type, payment_mode, status, slot_id, start_time, end_time, remark
                }).returning(["booking_id"]);

            return resolve(responseDeliver(responseCode.SUCCESS, "Booking has been registered successfully", "", result[0]))
        } catch (error) {
            handelErrorResponse(reject, error, "Unable to proceed with the booking")
        }
    });
}