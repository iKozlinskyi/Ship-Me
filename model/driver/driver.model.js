const mongoose = require('mongoose');
const User = require('../user/user.model');
const {DRIVER} = require('../../constants/userRoles');

const driverSpecificSchema = new mongoose.Schema({
  truck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck',
  },
});

const Driver = User.discriminator(DRIVER, driverSpecificSchema);

module.exports = Driver;
