const truckService = require('../../service/TruckService');
const {TRUCK_REMOVED_SUCCESSFULLY} = require('../../constants/messages');
const truckTypesMap = require('../../constants/truckTypesMap');

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
    // TODO: wrong status codes - unauthorized error can also be triggered
    // eslint-disable-next-line new-cap
    return res.status(404).json({error: err.message});
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
  const truckData = truckTypesMap[req.body.type] || req.body;
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

  try {
    const editedTruck = await truckService.updateById(id, truckDto);

    res.json(editedTruck);
  } catch (err) {
    res.status(409).send({error: err.message});
  }
});


module.exports = router;
