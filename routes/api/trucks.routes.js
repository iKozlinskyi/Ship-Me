const truckService = require('../../service/TruckService');

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.param('truckId', (req, res, next) => {
  const truckId = parseInt(req.params.truckId);

  try {
    req.truck = truckService.findById(truckId);
    next();
  } catch (err) {
    return res.status(404).json({error: err.message});
  }
});

router.get('/trucks', (req, res) => {
  const trucks = truckService.findAll();

  res.json({trucks});
});

router.get('/trucks/:truckId', (req, res) => {
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

router.delete('/trucks/:truckId', (req, res) => {
  const truckId = Number(req.params.truckId);

  truckService.removeById(truckId);

  res.json({status: `Truck with id ${truckId} removed successfully`});
});


module.exports = router;
