const mongoose = require('mongoose');

const baseOptions = {
  discriminatorKey: 'role', // our discriminator key, could be anything
  collection: 'users', // the name of our collection
};

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  passwordLastChanged: {type: Date, default: Date.now},
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, baseOptions);

const User = mongoose.model('User', userSchema);

module.exports = User;
