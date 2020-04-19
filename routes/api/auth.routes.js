const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const userService = require('../../service/UserService');
const authService = require('../../service/AuthService');
const registerValidation = require('../validation/auth/registerValidation');
const loginValidation = require('../validation/auth/loginValidation');
const {
  USER_REGISTERED,
  USER_AUTHENTICATED,
} = require('../../constants/responseStatuses');

/**
 * @api {post} /api/login authenticate user
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
 * @api {post} /api/register register user
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

module.exports = router;
