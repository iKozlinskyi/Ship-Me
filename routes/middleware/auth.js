const authService = require('../../service/AuthService');
const {NOT_AUTHORIZED} = require('../../constants/errors');

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.headers['authorization'].split(' ')[1];
    req.user = await authService.validateUser(jwtToken);
    next();
  } catch (err) {
    return res.status(401).json({error: NOT_AUTHORIZED});
  }
};
