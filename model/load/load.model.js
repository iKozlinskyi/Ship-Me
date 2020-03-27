const mongoose = require('mongoose');
const {SHIPPER, DRIVER} = require('../../constants/userRoles');

const loadSchema = new mongoose.Schema({
  status: {type: String, required: true},
  state: String,
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
    time: Date,
  }],
});

const Load = mongoose.model('Load', loadSchema);

module.exports = Load;