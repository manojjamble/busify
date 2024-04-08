const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
  seatNumbers: [String],
  totalAmount: Number,
  bookingDate: { type: Date, default: Date.now },
  status: String,
  updatedAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
