const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const truckSchema = mongoose.Schema({
  status: String,
  type: String,
});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;
