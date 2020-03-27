const mongoose = require('mongoose');
const {DRIVER} = require('../../constants/userRoles');

const truckSchema = new mongoose.Schema({
  status: String,
  type: String,
  dimensions: {
    width: {type: Number, required: true},
    height: {type: Number, required: true},
    length: {type: Number, required: true},
  },
  maxPayload: {type: Number, required: true},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: DRIVER,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: DRIVER,
  },
});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;
