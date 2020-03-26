const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const userService = require('../../service/UserService');
const authService = require('../../service/AuthService');

router.post('/users', async (req, res) => {
  const {username, password, role} = req.body;

  try {
    const user = await userService
        .createUserOfRole({username, password, role});
    const token = authService.generateToken(user);

    res.json({token});
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
});

module.exports = router;

