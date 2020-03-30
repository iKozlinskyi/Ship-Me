const userService = require('../../service/UserService');
const authService = require('../../service/AuthService');
const {NOT_AUTHORIZED} = require('../../constants/errors');

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.headers['authorization'].split(' ')[1];
    const decodedToken = authService.decodeToken(jwtToken);

    req.user = await userService.findByUsername(decodedToken.username);
    next();
  } catch (err) {
    return res.status(401).json({error: NOT_AUTHORIZED});
  }
};
