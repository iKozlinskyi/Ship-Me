const truckService = require('../../service/TruckService');
const {TRUCK_NOT_FOUND_BY_ID} = require('./../../constants/errors');
const {TRUCK_REMOVED_SUCCESSFULLY} = require('../../constants/messages');

const express = require('express');
// eslint-disable-next-line new-cap
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

router.get('/trucks', async (req, res) => {
  const trucks = await truckService.findAll();

  res.json({trucks});
});

router.get('/trucks/:id', (req, res) => {
  res.json(req.truck);
});

router.post('/trucks', (req, res) => {
  const truck = req.body;

  if (!truck) {
    return res.status(400).json({error: 'wrong request format'});
  }

  const savedTruck = truckService.save(truck);
  res.status(201).json(savedTruck);
});

router.delete('/trucks/:id', (req, res) => {
  const {id} = req.params;

  truckService.removeById(id);
  res.json({status: TRUCK_REMOVED_SUCCESSFULLY});
});

router.put('/trucks/:id', async (req, res) => {
  const {id} = req.params;
  const truckDto = req.body;

  // So far this is useless, as truckDto always truthy
  if (!truckDto) {
    return res.status(400).json({error: 'wrong request format'});
  }

  const editedTruck = await truckService.updateById(id, truckDto);

  res.json(editedTruck);
});


module.exports = router;