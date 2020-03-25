const truckService = require('../../service/TruckService');

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/trucks', (req, res) => {
  const trucks = truckService.findAll();

  res.json({trucks});
});

module.exports = router;
