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

  findByUsername(username) {
    return User.findOne({username}).select('-password');
  }

  async createUserOfRole({username, password, role}) {
    await this.validateUserData(username, password);

    const UserModel = this.getUserModel(role);
    const hashedPassword = await this.encodePassword(password);

    const createdUser = await UserModel.create({
      username,
      password: hashedPassword,
    });
    // To not expose encoded password to outer layer
    delete createdUser.password;

    return createdUser;
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

  remove(user) {
    return User.findByIdAndDelete(user);
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
    const passwordsMatch =
        await bcrypt.compare(oldPassword, editedUser.password);

    if (!passwordsMatch) {
      throw new Error(WRONG_OLD_PASSWORD);
    }

    await this.updateUserPassword(editedUser, newPassword);
  }

  encodePassword(password) {
    const saltRounds = config.get('saltRounds');

    return bcrypt.hash(password, saltRounds);
  }

  async updateUserPassword(user, newPassword) {
    const hashedPassword = await this.encodePassword(newPassword);
    await user.update({
      password: hashedPassword,
      passwordLastChanged: Date.now(),
    });
  }
}

module.exports = new UserService();
