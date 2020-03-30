const mongoose = require('mongoose');
const {
  NEW,
  POSTED,
  SHIPPED,
} = require('../constants/loadStatuses');
const {
  ROUTE_TO_PICK_UP,
  ARRIVED_TO_PICK_UP,
  ROUTE_TO_DELIVERY,
  ARRIVED_TO_DELIVERY,
} = require('../constants/loadStates');
const {SHIPPER, DRIVER} = require('../constants/userRoles');

const loadSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: [
      NEW,
      POSTED,
      SHIPPED,
    ],
    required: true,
  },
  state: {
    type: String,
    enum: [
      ROUTE_TO_PICK_UP,
      ARRIVED_TO_PICK_UP,
      ROUTE_TO_DELIVERY,
      ARRIVED_TO_DELIVERY,
    ],
  },
  dimensions: {
    width: {type: Number, required: true},
    height: {type: Number, required: true},
    length: {type: Number, required: true},
  },
  payload: {type: Number, required: true},
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
    time: {
      type: Date,
      default: Date.now,
    },
  }],
});

loadSchema.methods.addLog = async function(message) {
  this.logs.push({message});
  return this.save();
};

const Load = mongoose.model('Load', loadSchema);

module.exports = Load;
