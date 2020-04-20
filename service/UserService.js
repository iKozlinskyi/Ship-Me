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
const HttpError = require('../utils/HttpError');
const {USER_LACKS_AUTHORITY} = require('../constants/errors');
const crypto = require('crypto');
const util = require('util');
const {tokenValidFor} = require('../constants/resetPasswordToken');
const MailService = require('../service/MailService');
const {RESET_PASSWORD} = require('../constants/emailTypes');

class UserService {
  async findByCredentials({username, password}) {
    const foundUser = await User.findOne({username});
    if (!foundUser) {
      throw new HttpError(400, WRONG_CREDENTIALS);
    }

    const passwordsMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordsMatch) {
      throw new HttpError(400, WRONG_CREDENTIALS);
    }
    return foundUser;
  }

  async findByUsername(username) {
    const foundUser = await User.findOne({username}).select('-password');
    if (!foundUser) {
      throw new HttpError(404, USER_LACKS_AUTHORITY);
    }
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
      throw new HttpError(409, USERNAME_TAKEN);
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
      throw new HttpError(400, WRONG_OLD_PASSWORD);
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

  async resetPassword(username) {
    const mailConfig = {
      token: await this.generateResetToken(),
      to: 'ikozlinskyi@gmail.com',
      username,
    };
    const mailService = new MailService();

    return mailService
        .createEmailOfType(RESET_PASSWORD, mailConfig)
        .sendMail();
  }


  async generateResetToken() {
    const randomBytesGenerator = util.promisify(crypto.randomBytes);
    const buf = await randomBytesGenerator(20);
    return buf.toString('hex');
  }

  async setPasswordResetToken(user) {
    user.resetPasswordToken.token = await this.generateResetToken();
    user.resetPasswordToken.expirationDate = Date.now() + tokenValidFor;
    return user.save();
  }
}

module.exports = new UserService();
