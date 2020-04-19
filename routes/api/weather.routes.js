const express = require('express');
const router = express.Router();
const weatherService = require('./../../service/WeatherService');
const {SUCCESS} = require('../../constants/responseStatuses');

router.get('/', async (req, res, next) => {
  const {city} = req.query;

  try {
    const weatherData = await weatherService.getWeatherByCity(city);

    res.json({status: SUCCESS, weatherData});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
