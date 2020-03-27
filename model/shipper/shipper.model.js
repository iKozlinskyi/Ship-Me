const mongoose = require('mongoose');
const User = require('../user/user.model');
const {SHIPPER} = require('../../constants/userRoles');

const shipperSpecificSchema = new mongoose.Schema({
  createdLoads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Load',
  }],
});

const Driver = User.discriminator(SHIPPER, shipperSpecificSchema);

module.exports = Driver;
