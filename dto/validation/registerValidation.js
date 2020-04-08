const {celebrate, Joi, Segments} = require('celebrate');
const {
  DRIVER,
  SHIPPER,
} = require('../../constants/userRoles');

const registerValidation = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  role: Joi.string().valid(DRIVER, SHIPPER),
});

module.exports = celebrate({
  [Segments.BODY]: registerValidation,
});
