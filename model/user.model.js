const mongoose = require('mongoose');

const baseOptions = {
  discriminatorKey: 'role', // our discriminator key, could be anything
  collection: 'users', // the name of our collection
};

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  passwordLastChanged: {type: Date, default: Date.now},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    token: String,
    expirationDate: Date,
  },
}, baseOptions);

const User = mongoose.model('User', userSchema);

module.exports = User;
