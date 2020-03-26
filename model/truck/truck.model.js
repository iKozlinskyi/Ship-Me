const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const truckSchema = new mongoose.Schema({
  status: String,
  type: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  },
});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;
