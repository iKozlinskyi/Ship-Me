const axios = require('axios');
const config = require('config');
const {WEATHER_API} = require('../constants/externalApiLinks');
const weatherApiKey = config.get('weatherApiKey');
const HttpError = require('./../utils/HttpError');
const {CANNOT_FIND_LOCATION} = require('../constants/errors');

class WeatherService {
  getWeatherByCity(city) {
    const reqParams = {
      q: city,
      appid: weatherApiKey,
    };

    return axios
        .get(WEATHER_API, {params: reqParams})
        .then((res) => res.data)
        .catch((err) => {
          switch (err.response.status) {
            case 404:
              throw new HttpError(404, CANNOT_FIND_LOCATION);
            default:
              throw new Error(err);
          }
        });
  }
}

module.exports = new WeatherService();
