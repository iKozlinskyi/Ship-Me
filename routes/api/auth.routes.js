const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const userService = require('../../service/UserService');
const authService = require('../../service/AuthService');
const {WRONG_CREDENTIALS} = require('../../constants/errors');

router.post('/login', async (req, res) => {
  const userData = req.body;

  try {
    const user = await userService.findByCredentials(userData);
    const token = authService.generateToken(user);

    res.json({token});
  } catch (err) {
    return res.status(401).json({status: WRONG_CREDENTIALS});
  }
});

router.post('/register', async (req, res) => {
  const {username, password} = req.body;

  try {
    const user = await userService.createUser(username, password);
    const token = authService.generateToken(user);

    res.json({token});
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
});

module.exports = router;
