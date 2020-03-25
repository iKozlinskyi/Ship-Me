const {
  USERNAME_TAKEN,
  WRONG_CREDENTIALS,
  PASSWORD_BLANK,
  USERNAME_BLANK,
} = require('../constants/errors');

class UserService {
  constructor() {
    this.users = [
      {username: 'Banana', password: '123'},
      {username: 'Potato', password: 'abc'},
    ];
  }

  findByCredentials({username, password}) {
    const foundUser = this.users.find((user) => {
      return user.username === username && user.password === password;
    });

    if (!foundUser) {
      throw new Error(WRONG_CREDENTIALS);
    }

    return foundUser;
  }

  createUser(username, password) {
    this.validateUserData(username, password);

    const newUser = {username, password};

    this.users.push(newUser);
    return newUser;
  }


  isUsernameAvailable(username) {
    return !this.users.some((user) => user.username === username);
  }

  validateUserData(username, password) {
    if (!this.isUsernameAvailable(username)) {
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
