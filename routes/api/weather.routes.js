const express = require('express');
const router = express.Router();
const weatherService = require('./../../service/WeatherService');
const {SUCCESS} = require('../../constants/responseStatuses');
const validateGetWeatherForCity =
  require('./../validation/weather/getWeatherForCity');

/**
 * @api {get} api/weather Get weather for city
 * @apiName GetWeather
 * @apiGroup Weather
 *
 * @apiParam {String} city city for request
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "status": "SUCCESS",
 *        "weatherData": {
 *            "coord": {
 *                "lon": -0.13,
 *                "lat": 51.51
 *            },
 *            "weather": [
 *                {
 *                    "id": 800,
 *                    "main": "Clear",
 *                    "description": "clear sky",
 *                    "icon": "01d"
 *                }
 *            ],
 *            "base": "stations",
 *            "main": {
 *                "temp": 290.09,
 *                "feels_like": 282.1,
 *                "temp_min": 288.71,
 *                "temp_max": 290.93,
 *                "pressure": 1019,
 *                "humidity": 33
 *            },
 *            "visibility": 10000,
 *            "wind": {
 *                "speed": 8.7,
 *                "deg": 90
 *            },
 *            "clouds": {
 *                "all": 0
 *            },
 *            "dt": 1587309286,
 *            "sys": {
 *                "type": 1,
 *                "id": 1414,
 *                "country": "GB",
 *                "sunrise": 1587272119,
 *                "sunset": 1587323004
 *            },
 *            "timezone": 3600,
 *            "id": 2643743,
 *            "name": "London",
 *            "cod": 200
 *        }
 *    }
 *
 */
router.get('/', validateGetWeatherForCity, async (req, res, next) => {
  const {city} = req.query;

  try {
    const weatherData = await weatherService.getWeatherByCity(city);

    res.json({status: SUCCESS, weatherData});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
