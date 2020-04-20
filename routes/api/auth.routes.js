const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const userService = require('../../service/UserService');
const authService = require('../../service/AuthService');
const registerValidation = require('../validation/auth/registerValidation');
const loginValidation = require('../validation/auth/loginValidation');
const emailForResetPasswordValidation =
  require('../validation/auth/emailForResetPasswordValidation');
const resetPasswordValidation =
  require('../validation/auth/resetPasswordValidation');
const {
  USER_REGISTERED,
  USER_AUTHENTICATED,
  PASSWORD_RESET_EMAIL_SENT,
  PASSWORD_CHANGED,
} = require('../../constants/responseStatuses');

/**
 * @api {post} /api/auth/login authenticate user
 *
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {String} username current user username
 * @apiParam {String} password current user password
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "Potato"
 *       "password": "123"
 *     }
 *
 * @apiSuccess (200) {String} status Response status text
 * @apiSuccess (200) {String} token user JWT token
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "User authenticated successfully",
 *       "token": "adde238h238hfuhf289pf892fh2f23fphf2p"
 *     }
 */
router.post('/login', loginValidation, async (req, res, next) => {
  const userData = req.body;

  try {
    const user = await userService.findByCredentials(userData);
    const token = authService.generateToken(user);

    res.json({status: USER_AUTHENTICATED, token});
  } catch (err) {
    return next(err);
  }
});

/**
 * @api {post} /api/auth/register register user
 *
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiParam {String} username new user username
 * @apiParam {String} password new user password
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "Potato"
 *       "password": "123"
 *     }
 *
 * @apiSuccess (200) {String} status Response status text
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "User registered successfully",
 *     }
 */
router.post('/register', registerValidation, async (req, res, next) => {
  const registerUserDto = req.body;

  try {
    await userService.createUserOfRole(registerUserDto);
    res.json({status: USER_REGISTERED});
  } catch (err) {
    return next(err);
  }
});

/**
 * @api {post} /api/auth/forgot Send reset password email
 *
 * @apiName ForgotPassword
 * @apiGroup Auth
 *
 * @apiParam {String} email User email
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "Potato@gmail.com"
 *     }
 *
 * @apiSuccess (200) {String} status Response status text
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "An email with further instructions has been sent"
 *     }
 */
router.post('/forgot',
    emailForResetPasswordValidation,
    async (req, res, next) => {
      const {email} = req.body;
      try {
        await userService.sendPasswordResetToken(email);
        res.json({status: PASSWORD_RESET_EMAIL_SENT});
      } catch (err) {
        next(err);
      }
    });

/**
 * @api {put} /api/auth/password/:token Reset password
 *
 * @apiName ResetPassword
 * @apiGroup Auth
 *
 * @apiParam {String} token Token obtained from email
 * @apiParam {String} password New password
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "password": "123abc"
 *     }
 *
 * @apiSuccess (200) {String} status Response status text
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "Password successfully changed"
 *     }
 */
router.put('/password/:token',
    resetPasswordValidation,
    async (req, res, next) => {
      const {password} = req.body;
      const {token} = req.params;
      try {
        await userService.resetPassword(token, password);
        res.json({status: PASSWORD_CHANGED});
      } catch (err) {
        next(err);
      }
    });

module.exports = router;
