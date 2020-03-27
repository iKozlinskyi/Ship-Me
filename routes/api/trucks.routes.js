const truckService = require('../../service/TruckService');
const driverService = require('../../service/DriverService');
const {TRUCK_NOT_FOUND_BY_ID} = require('./../../constants/errors');
const {TRUCK_REMOVED_SUCCESSFULLY} = require('../../constants/messages');
const truckTypesMap = require('../../constants/truckTypesMap');

const express = require('express');
const router = express.Router();

router.param('id', async (req, res, next) => {
  const {id} = req.params;

  try {
    req.truck = await truckService.findById(id);
    next();
  } catch (err) {
    // eslint-disable-next-line new-cap
    return res.status(404).json({error: TRUCK_NOT_FOUND_BY_ID});
  }
});

router.get('/', async (req, res) => {
  const userId = req.user._id;
  const trucks = await truckService.findByCreatedUserId(userId);

  res.json({trucks});
});

router.get('/:id', (req, res) => {
  res.json(req.truck);
});

router.post('/', async (req, res) => {
  const truckData = truckTypesMap[req.body.type];
  truckData.createdBy = req.user._id;

  try {
    const savedTruck = await truckService.save(truckData);

    res.status(201).json(savedTruck);
  } catch (err) {
    return res.status(400).json({error: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;

  await truckService.removeById(id);
  res.json({status: TRUCK_REMOVED_SUCCESSFULLY});
});

router.put('/:id', async (req, res) => {
  const {id} = req.params;
  const truckDto = req.body;

  // So far this is useless, as truckDto always truthy
  if (!truckDto) {
    return res.status(400).json({error: 'wrong request format'});
  }

  const editedTruck = await truckService.updateById(id, truckDto);

  res.json(editedTruck);
});


// This looks bad.
// TODO: ask what endpoint should be used
router.get('/:id/assign', async (req, res) => {
  const truckId = req.params.id;
  const driverId = req.user._id;

  try {
    const assignedTruck = await driverService.assignTruck(driverId, truckId);

    res.json(assignedTruck);
  } catch (err) {
    console.log(err);
    res.status(403).json({error: err.message});
  }
});


module.exports = router;
