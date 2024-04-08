const asyncHandler = require('express-async-handler');const Booking = require('../models/booking');

//@desc Get all bookings
//@booking GET /api/bookings
//@access Public
const getBookings = asyncHandler( async (req, res) => {
});

//@desc Get booking by ID
//@booking GET /api/bookings/:id
//@access Public
const getBooking = asyncHandler( async (req, res) => {
});

//@desc Register booking
//@booking POST /api/bookings
//@access Public
const createBooking = asyncHandler( async (req, res) => {
});

//@desc Update booking
//@booking PUT /api/bookings/:id
//@access Public
const updateBooking = asyncHandler( async (req, res) => {
});

//@desc Delete booking
//@booking DELETE /api/bookings/:id
//@access Public
const deleteBooking = asyncHandler( async (req, res) => {
});

module.exports = { getBookings, getBooking, createBooking, updateBooking, deleteBooking };
