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

exports.getUserCurrentBooking=(reqData)=>{
    let {user_id} = reqData
    return new Promise(async (resolve,reject)=>{
        try {
            let result = await pgClient(pgTables.booking)
                .whereIn('status',['BOOKED', 'REQUESTED'])
                .andWhere({user_id})
            return resolve(responseDeliver(responseCode.SUCCESS, "Current booking has been fetched successfully", "", result[0]))

        }catch (error) {
            handelErrorResponse(reject, error, "Unable to fetch the booking")
        }
    })
}

exports.getAllCurrentBooking=()=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let result = await pgClient(pgTables.booking)
                .whereIn('status',['BOOKED', 'REQUESTED'])
            return resolve(responseDeliver(responseCode.SUCCESS, "Current booking has been fetched successfully", "", result[0]))

        }catch (error) {
            handelErrorResponse(reject, error, "Unable to fetch the booking")
        }
    })
}

exports.getAllBookingsByDate = (reqData) => {
    let {date} = reqData
    return new Promise(async (resolve, reject) => {
        try {
            // Construct the date range for the provided date
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1); // Add 1 day to get the end of the day

            // Query bookings within the date range
            let result = await pgClient(pgTables.booking)
                .where('created_at', '>=', startDate.toISOString()) // Filter bookings after start of the provided date
                .where('created_at', '<', endDate.toISOString()); // Filter bookings before the end of the provided date

            return resolve(responseDeliver(responseCode.SUCCESS, "Bookings for the provided date have been fetched successfully", "", result));
        } catch (error) {
            handelErrorResponse(reject, error, "Unable to fetch the bookings for the provided date");
        }
    });
};
