const jwt = require('jsonwebtoken');
const config = require('config');
const salt = config.get('jwtSalt');


class AuthService {
  generateToken(user) {
    return jwt.sign(JSON.stringify(user), salt);
  }

  decodeToken(token) {
    return jwt.verify(token, salt);
  }
}

module.exports = new AuthService();
