const jwt = require('jsonwebtoken');
const config = require('config');
const salt = config.get('jwtSalt');
const userService = require('./UserService');
const moment = require('moment');


class AuthService {
  generateToken({username, role}) {
    const iat = Date.now();
    return jwt.sign(JSON.stringify({username, role, iat}), salt);
  }

  async validateToken(token) {
    const {iat, username} = jwt.verify(token, salt);
    const foundUser = await userService.findByUsername(username);

    const isTokenExpired =
        !this.isTokenCreatedAfterPasswordChange(
            iat, foundUser.passwordLastChanged);

    if (isTokenExpired) {
      throw new Error();
    }

    return foundUser;
  }

  isTokenCreatedAfterPasswordChange(tokenIat, passwordLastChanged) {
    const passwordLastChangedMoment = moment(passwordLastChanged);
    const tokenIatMoment = moment(tokenIat);

    return tokenIatMoment.isAfter(passwordLastChangedMoment);
  }
}

module.exports = new AuthService();
