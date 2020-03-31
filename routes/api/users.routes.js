const express = require('express');
const router = express.Router();
const userService = require('../../service/UserService');
const authService = require('../../service/AuthService');
const requireRole = require('../middleware/requireUserRole');
const driverService = require('../../service/DriverService');
const loadService = require('../../service/LoadService');
const {DRIVER} = require('../../constants/userRoles');
const {USER_LACKS_AUTHORITY} = require('../../constants/errors');
const changePasswordValidation =
    require('../../dto/validation/changePasswordValidation');


router.param('userId', (req, res, next) => {
  const {userId} = req.params;
  const authUser = req.user;

  if (userId !== authUser.id) {
    return res.status(403).json({error: USER_LACKS_AUTHORITY});
  }
  next();
});

router.param('loadId', async (req, res, next) => {
  const {loadId} = req.params;
  const user = req.user;

  try {
    const foundLoad = await loadService.findById(loadId);

    if (!loadService.hasUserAuthorityForLoad(user, foundLoad)) {
      return res.status(403).json({error: USER_LACKS_AUTHORITY});
    }

    req.load = foundLoad;
    next();
  } catch (err) {
    return next(err);
  }
});

router.post('/users', async (req, res, next) => {
  const {username, password, role} = req.body;

  try {
    const user = await userService
        .createUserOfRole({username, password, role});
    const token = authService.generateToken(user);

    res.json({token});
  } catch (err) {
    return next(err);
  }
});

// This looks inconsistent.
// TODO: ask what endpoint should be used, an error might occur here - we don`t
// check if truck exists. The truck id is passed in response body
router.post('/:userId/assignedTrucks',
    requireRole(DRIVER),
    async (req, res, next) => {
      const {truckId} = req.body;
      const driverId = req.user._id;

      try {
        const assignedTruck =
            await driverService.assignTruck(driverId, truckId);

        res.json(assignedTruck);
      } catch (err) {
        return next(err);
      }
    });


router.get('/:userId/assignedTrucks',
    requireRole(DRIVER),
    async (req, res, next) => {
      const driver = req.user;

      try {
        const assignedTruck =
            await driverService.getAssignedDriverTruck(driver);

        res.json({assignedTruck});
      } catch (err) {
        return next(err);
      }
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


router.get('/:userId/assignedLoads',
    requireRole(DRIVER),
    async (req, res, next) => {
      const driver = req.user;

      try {
        const assignedLoad = await driverService.getAssignedDriverLoad(driver);
        res.json({assignedLoad});
      } catch (err) {
        return next(err);
      }
    });

// TODO: now the load state is changed by request body
/**
 * The input from body is read "as is", without validation,
 * and then this string is used to set new state for load. Maybe I should use
 * like a mapping between load state, and a number -
 * 1: en route to pickup,
 * 2: arrived to pickup...
 * And take this number from client
 */
router.patch('/:userId/assignedLoads/:loadId',
    requireRole(DRIVER),
    async (req, res, next) => {
      const load = req.load;
      const {loadState} = req.body;
      try {
        const updatedLoad =
            await loadService.performLoadStateChange(load, loadState);

        res.json({load: updatedLoad});
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

