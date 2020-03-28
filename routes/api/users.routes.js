const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const userService = require('../../service/UserService');
const authService = require('../../service/AuthService');
const requireRole = require('../middleware/requireUserRole');
const driverService = require('../../service/DriverService');
const {DRIVER} = require('../../constants/userRoles');

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

// This looks inconsistent.
// TODO: ask what endpoint should be used
router.post('/:driverId/assignedTrucks',
    requireRole(DRIVER),
    async (req, res) => {
      const truckId = req.params.id;
      const driverId = req.user._id;

      try {
        const assignedTruck =
            await driverService.assignTruck(driverId, truckId);

        res.json(assignedTruck);
      } catch (err) {
        console.log(err);
        res.status(403).json({error: err.message});
      }
    });

// Works even if userId is not valid
// TODO: check this
router.get('/:driverId/assignedTrucks',
    requireRole(DRIVER),
    async (req, res) => {
      const driver = req.user;

      try {
        const assignedTruck =
            await driverService.getAssignedDriverTruck(driver);

        res.json({assignedTruck});
      } catch (err) {
        res.status(404).send({error: err.message});
      }
    });

// Works even if userId is not valid
// TODO: check this
router.get('/:driverId/assignedLoads',
    requireRole(DRIVER),
    async (req, res) => {
      const driver = req.user;

      try {
        const assignedLoad = await driverService.getAssignedDriverLoad(driver);
        res.json({assignedLoad});
      } catch (err) {
        res.status(404).send({error: err.message});
      }
    });

module.exports = router;

