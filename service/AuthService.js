const jwt = require('jsonwebtoken');
const config = require('config');
const salt = config.get('jwtSalt');


class AuthService {
  generateToken({username, password}) {
    return jwt.sign(JSON.stringify({username, password}), salt);
  }

  decodeToken(token) {
    return jwt.verify(token, salt);
  }
}

module.exports = new AuthService();
