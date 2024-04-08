const mongoose = require('mongoose');
const Route = require('./route');

const scheduleSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route'}, 
  departureTime: Date,
  arrivalTime: Date,
  frequency: String,
  daysOfWeek: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
