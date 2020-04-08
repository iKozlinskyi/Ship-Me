const truckService = require('../../service/TruckService');
const {
  TRUCK_REMOVED_SUCCESSFULLY,
  TRUCK_ASSIGNED,
  TRUCK_CREATED,
} = require('../../constants/responseStatuses');
const truckTypesMap = require('../../constants/truckTypesMap');
const driverService = require('../../service/DriverService');
const {isValidObjectId} = require('../../utils/isValidObjectId');
const HttpError = require('../../utils/HttpError');
const {
  WRONG_ID_FORMAT,
} = require('../../constants/errors');
const validateCreateOrEditTruck =
  require('../validation/trucks/validateCreateOrEditTruck');

const express = require('express');
const router = express.Router();

/**
 * @apiDefine WrongRequestFormat
 *
 * @apiError (400) WrongRequestFormat Request payload has wrong format
 */

/**
 * @apiDefine TruckNotFound
 *
 * @apiError (404) LoadNotFound Cannot find load with given <code>id</code>
 */

/**
 * @apiDefine NoPermission
 *
 * @apiError (401) NoPermission User lacks permission
 */


router.param('id', async (req, res, next) => {
  const {id} = req.params;
  if (!isValidObjectId(id)) {
    return next(new HttpError(404, WRONG_ID_FORMAT));
  }
  const driver = req.user;

  try {
    req.truck = await truckService.findById(id);
    truckService.checkDriverReadWriteRights(driver, req.truck);
    next();
  } catch (err) {
    return next(err);
  }
});

/**
 * @api {get} api/loads Retrieve list of trucks (for this driver).
 * @apiName GetTrucks
 * @apiGroup Truck
 *
 * @apiSuccess (200) {Object[]} trucks Loads created by current Shipper.
 * @apiSuccess (200) {String} truck._id load unique id
 * @apiSuccess (200) {String} load.assigned_to unique id of
 * driver who has this truck assigned
 * @apiSuccess (200) {String} load.created_by unique id of
 * driver who created this truck
 * @apiSuccess (200) {String} truck.status truck status
 * @apiSuccess (200) {String} truck.state truck state
 * @apiSuccess (200) {Number} truck.maxPayload truck maximum payload
 * @apiSuccess (200) {Object} truck.dimensions truck dimensions object
 * @apiSuccess (200) {Number} truck.dimensions.width truck width
 * @apiSuccess (200) {Number} truck.dimensions.height truck height
 * @apiSuccess (200) {Number} truck.dimensions.length truck length
 */
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

router.post('/', validateCreateOrEditTruck, async (req, res, next) => {
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

router.put('/:id', validateCreateOrEditTruck, async (req, res, next) => {
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
