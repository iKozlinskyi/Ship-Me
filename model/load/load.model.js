const mongoose = require('mongoose');
const {SHIPPER, DRIVER} = require('../../constants/userRoles');

const loadSchema = new mongoose.Schema({
  status: String,
  state: String,
  dimensions: {
    width: Number,
    height: Number,
    length: Number,
    required: true,
  },
  payload: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: SHIPPER,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: DRIVER,
  },
  logs: [{
    message: String,
    time: Date,
  }],
});

const Truck = mongoose.model('Truck', loadSchema);

module.exports = Truck;
