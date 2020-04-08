const express = require('express');
const router = express.Router();
const userService = require('../../service/UserService');
const {USER_LACKS_AUTHORITY} = require('../../constants/errors');
const changePasswordValidation =
    require('../validation/users/changePasswordValidation');


router.param('userId', (req, res, next) => {
  const {userId} = req.params;
  const authUser = req.user;

  if (userId !== authUser.id) {
    return res.status(403).json({error: USER_LACKS_AUTHORITY});
  }
  next();
});


router.post(
    '/:userId/password',
    changePasswordValidation,
    async (req, res, next) => {
      const user = req.user;
      const {oldPassword, newPassword} = req.body;

      try {
        await userService.changePassword(user, oldPassword, newPassword);

        res.json({status: 'ok'});
      } catch (err) {
        return next(err);
      }
    });


// TODO: removed user has to remove adjacent data: loads for shippers
router.delete('/:userId', async (req, res) => {
  const user = req.user;
  await userService.remove(user);

  res.status(200).json({status: 'User successfully removed'});
});

module.exports = router;

