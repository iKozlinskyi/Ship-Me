const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const userService = require('../../service/UserService');
const authService = require('../../service/AuthService');
const registerValidation = require('../../dto/validation/registerValidation');
const loginValidation = require('../../dto/validation/loginValidation');
const {
  USER_REGISTERED,
  USER_AUTHENTICATED,
} = require('../../constants/responseStatuses');

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
