const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  sourceCity: String,
  destinationCity: String,
  distance: Number,
  duration: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
