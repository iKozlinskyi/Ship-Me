const {USER_LACKS_AUTHORITY} = require('../../constants/errors');

module.exports = (requiredUserRole) => (req, res, next) => {
  const loggedUser = req.user;

  if (loggedUser.role !== requiredUserRole) {
    return res.status(403).json({error: USER_LACKS_AUTHORITY});
  }

  next();
};
