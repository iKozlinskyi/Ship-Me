const {
  USERNAME_TAKEN,
  WRONG_CREDENTIALS,
  PASSWORD_BLANK,
  USERNAME_BLANK,
} = require('../constants/errors');

const User = require('../model/user/user.model');
const Driver = require('../model/driver/driver.model');
const {DRIVER} = require('../constants/userRoles');

class UserService {
  async findByCredentials({username, password}) {
    const foundUser = await User.findOne({username, password});

    if (!foundUser) {
      throw new Error(WRONG_CREDENTIALS);
    }
    return foundUser;
  }

  async createUserOfRole({username, password, role}) {
    await this.validateUserData(username, password);

    const userModel = this.getUserModel(role);

    const savedUser = await userModel.create({username, password});
    console.log(savedUser);
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

  getUserModel(role) {
    switch (role) {
      case DRIVER:
        return Driver;
    }
  }
}

module.exports = new UserService();