const express = require('express');
const router = express.Router();
const userService = require('../../service/UserService');
const changePasswordValidation =
    require('../validation/users/changePasswordValidation');
const {isValidObjectId} = require('../../utils/isValidObjectId');
const HttpError = require('../../utils/HttpError');
const {
  PASSWORD_CHANGED,
  USER_REMOVED,
} = require('../../constants/responseStatuses');
const {
  WRONG_ID_FORMAT,
  USER_LACKS_AUTHORITY,
} = require('../../constants/errors');

router.param('userId', (req, res, next) => {
  const {userId} = req.params;
  if (!isValidObjectId(id)) {
    return next(new HttpError(404, WRONG_ID_FORMAT));
  }
  const authUser = req.user;

  if (userId !== authUser.id) {
    return res.status(403).json({error: USER_LACKS_AUTHORITY});
  }
  next();
});

/**
 * @api {post} /api/:userId/password Change user password
 *
 * @apiName ChangePassword
 * @apiGroup User
 *
 * @apiUse AuthHeader
 *
 * @apiParam {String} userId unique user id
 * @apiParam {String} oldPassword old user password
 * @apiParam {String} newPassword new user password
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "oldPassword": "123"
 *       "newPassword": "abc"
 *     }
 *
 * @apiSuccess (200) {String} status Response status text
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "Password successfully changed"
 *     }
 */
router.post(
    '/:userId/password',
    changePasswordValidation,
    async (req, res, next) => {
      const user = req.user;
      const {oldPassword, newPassword} = req.body;

      try {
        await userService.changePassword(user, oldPassword, newPassword);

        res.json({status: PASSWORD_CHANGED});
      } catch (err) {
        return next(err);
      }
    });

/**
 * @api {delete} /api/:userId Delete user
 *
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiUse AuthHeader
 *
 * @apiParam {String} userId unique user id
 *
 * @apiSuccess (200) {String} status Response status text
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "User successfully removed"
 *     }
 */
// TODO: User removal has to remove adjacent data: loads for shippers,
// trucks for drivers.
router.delete('/:userId', async (req, res) => {
  const user = req.user;
  await userService.remove(user);

  res.status(200).json({status: USER_REMOVED});
});

module.exports = router;

