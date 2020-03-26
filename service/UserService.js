const {
  USERNAME_TAKEN,
  WRONG_CREDENTIALS,
  PASSWORD_BLANK,
  USERNAME_BLANK,
} = require('../constants/errors');

const User = require('../model/user/user.model');

class UserService {
  async findByCredentials({username, password}) {
    const foundUser = await User.findOne({username, password});

    if (!foundUser) {
      throw new Error(WRONG_CREDENTIALS);
    }

    return foundUser;
  }

  async createUser(username, password) {
    await this.validateUserData(username, password);
    const savedUser = User.create({username, password});

    return savedUser;
  }


  async isUsernameTaken(username) {
    return User.exists({username});
  }

  async validateUserData(username, password) {
    const isUsernameTaken = await this.isUsernameTaken(username);

    if (isUsernameTaken) {
      throw new Error(USERNAME_TAKEN);
    }

    if (!username) {
      throw new Error(USERNAME_BLANK);
    }

    if (!password) {
      throw new Error(PASSWORD_BLANK);
    }
  }
}

module.exports = new UserService();
