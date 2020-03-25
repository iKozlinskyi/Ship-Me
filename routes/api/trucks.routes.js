const truckService = require('../../service/TruckService');

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.param('id', (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    req.truck = truckService.findById(id);
    next();
  } catch (err) {
    return res.status(404).json({error: err.message});
  }
});

router.get('/trucks', (req, res) => {
  const trucks = truckService.findAll();

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
  const id = Number(req.params.id);

  truckService.removeById(id);

  res.json({status: `Truck with id ${id} removed successfully`});
});

router.put('/trucks/:id', (req, res) => {
  const id = Number(req.params.id);
  const truckDto = req.body;

  // So far this is useless, as truckDto always truthy
  if (!truckDto) {
    return res.status(400).json({error: 'wrong request format'});
  }

  const editedTruck = truckService.updateById(id, truckDto);

  res.json(editedTruck);
});


module.exports = router;
