const mongoose = require('mongoose');
const {DRIVER} = require('../../constants/userRoles');

const truckSchema = new mongoose.Schema({
  status: String,
  type: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: DRIVER,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: DRIVER,
    required: true,
  },
});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;
