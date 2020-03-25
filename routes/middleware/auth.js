const userService = require('../../service/UserService');
const authService = require('../../service/AuthService');
const {NOT_AUTHORIZED} = require('../../constants/errors');

module.exports = (req, res, next) => {
  try {
    const jwtToken = req.headers['authorization'].split(' ')[1];
    const user = authService.decodeToken(jwtToken);

    req.user = userService.findByCredentials(user);
    next();
  } catch (err) {
    return res.status(401).json({error: NOT_AUTHORIZED});
  }
};
