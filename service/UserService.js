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
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');


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
    let transporter = nodemailer.createTransport({
      host: "127.0.0.1",
      port: 1025,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "ship-me-app@protonmail.com",
        pass: "0be11aCia0"
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    transporter.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    const mailOptions = {
      from: 'ihor.kozlinskyi.dev@gmail.com',
      to: 'ihor.kozlinskyi.dev@gmail.com',

      subject: 'Node.js Password Reset',
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + 'req.headers.host' + '/reset/' + 'token' + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    };
    const data = await transporter.sendMail(mailOptions);
    console.log(data);
    return data;
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
