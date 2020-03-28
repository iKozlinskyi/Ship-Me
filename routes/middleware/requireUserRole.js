const {USER_LACKS_AUTHORITY} = require('../../constants/errors');

module.exports = (requiredUserRole) => (req, res, next) => {
  const loggedUser = req.user;

  if (!Array.isArray(requiredUserRole)) {
    requiredUserRole = [requiredUserRole];
  }

  if (!requiredUserRole.includes(loggedUser.role)) {
    return res.status(403).json({error: USER_LACKS_AUTHORITY});
  }

  next();
};
