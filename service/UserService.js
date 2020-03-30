const {
  USERNAME_TAKEN,
  WRONG_CREDENTIALS,
  WRONG_OLD_PASSWORD,
} = require('../constants/errors');
const bcrypt = require('bcrypt');
const config = require('config');

const User = require('../model/user.model');
const Driver = require('../model/driver.model');
const Shipper = require('../model/shipper.model');
const {SHIPPER, DRIVER} = require('../constants/userRoles');

class UserService {
  async findByCredentials({username, password}) {
    const foundUser = await User.findOne({username});
    if (!foundUser) {
      throw new Error(WRONG_CREDENTIALS);
    }

    const passwordsMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordsMatch) {
      throw new Error(WRONG_CREDENTIALS);
    }
    return foundUser;
  }

  async createUserOfRole({username, password, role}) {
    await this.validateUserData(username, password);

    const UserModel = this.getUserModel(role);
    const hashedPassword = await this.encodePassword(password);

    return UserModel.create({
      username,
      password: hashedPassword,
    });
  }


  async isUsernameTaken(username) {
    return User.exists({username});
  }

  async validateUserData(username) {
    const isUsernameTaken = await this.isUsernameTaken(username);

    if (isUsernameTaken) {
      throw new Error(USERNAME_TAKEN);
    }
  }

  getUserModel(role) {
    switch (role) {
      case DRIVER:
        return Driver;
      case SHIPPER:
        return Shipper;
    }
  }

  async changePassword(user, oldPassword, newPassword) {
    const editedUser = await User.findById(user.id);

    if (editedUser.password !== oldPassword) {
      throw new Error(WRONG_OLD_PASSWORD);
    }

    editedUser.password = newPassword;

    return editedUser.save();
  }

  encodePassword(password) {
    const saltRounds = config.get('saltRounds');

    return bcrypt.hash(password, saltRounds);
  }
}

module.exports = new UserService();
