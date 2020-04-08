const truckService = require('../../service/TruckService');
const {
  TRUCK_REMOVED_SUCCESSFULLY,
  TRUCK_ASSIGNED,
  TRUCK_CREATED,
} = require('../../constants/responseStatuses');
const truckTypesMap = require('../../constants/truckTypesMap');
const driverService = require('../../service/DriverService');

const express = require('express');
const router = express.Router();

router.param('id', async (req, res, next) => {
  const {id} = req.params;
  const driver = req.user;

  try {
    req.truck = await truckService.findById(id);
    truckService.checkDriverReadWriteRights(driver, req.truck);
    next();
  } catch (err) {
    return next(err);
  }
});

router.get('/', async (req, res) => {
  const userId = req.user._id;
  const truckEntityList = await truckService.findByCreatedUserId(userId);
  const truckResponseDtoList =
    truckService.convertEntityListToResponseDtoList(truckEntityList);

  res.json({trucks: truckResponseDtoList});
});

router.get('/:id', (req, res) => {
  const truckResponseDto =
    truckService.convertTruckEntityToTruckResponseDto(req.truck);

  res.json(truckResponseDto);
});

router.post('/', async (req, res, next) => {
  const truckData = truckTypesMap[req.body.type] || req.body;
  truckData.createdBy = req.user._id;
  truckData.type = req.body.type;

  try {
    await truckService.save(truckData);

    res.json({status: TRUCK_CREATED});
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const truck = req.truck;

  try {
    await truckService.remove(truck);
  } catch (err) {
    return next(err);
  }
  res.json({status: TRUCK_REMOVED_SUCCESSFULLY});
});

router.put('/:id', async (req, res, next) => {
  const {id} = req.params;
  const truckDto = truckTypesMap[req.body.type] ?
    {...truckTypesMap[req.body.type], type: req.body.type} :
    req.body;

  // So far this is useless, as truckDto always truthy
  if (!truckDto) {
    return res.status(400).json({error: 'wrong request format'});
  }

  try {
    const editedTruck = await truckService.updateById(id, truckDto);

    res.json(editedTruck);
  } catch (err) {
    return next(err);
  }
});

router.patch('/:id/assign', async (req, res, next) => {
  const {id: truckId} = req.params;
  const driverId = req.user._id;

  try {
    await driverService.assignTruck(driverId, truckId);

    res.json({status: TRUCK_ASSIGNED});
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
