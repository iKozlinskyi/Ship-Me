const jwt = require('jsonwebtoken');
const config = require('config');
const salt = config.get('jwtSalt');
const userService = require('./UserService');
const moment = require('moment');
const {TOKEN_NOT_VALID, TOKEN_EXPIRED} = require('../constants/errors');
const {decodedJwtSchema} = require('../dto/validation/decodedJwtSchema');
const HttpError = require('../utils/HttpError');


class AuthService {
  generateToken({username, role}) {
    const iat = Date.now();
    return jwt.sign(JSON.stringify({username, role, iat}), salt);
  }

  async validateUser(token) {
    const decodedToken = jwt.verify(token, salt);
    const {error} = decodedJwtSchema.validate(decodedToken);

    if (error) {
      throw new HttpError(400, TOKEN_NOT_VALID);
    }
    const {username, iat} = decodedToken;
    const foundUser = await userService.findByUsername(username);

    const isTokenExpired =
        !this.isTokenCreatedAfterPasswordChange(
            iat, foundUser.passwordLastChanged);

    if (isTokenExpired) {
      throw new HttpError(400, TOKEN_EXPIRED);
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
