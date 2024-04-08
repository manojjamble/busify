const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: String,
  operatorName: String,
  totalSeats: Number,
  availableSeats: Number,
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
  bookingId: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Booking'}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
