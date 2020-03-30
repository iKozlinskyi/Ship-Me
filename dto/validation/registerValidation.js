const {celebrate, Joi, Segments} = require('celebrate');

const registerValidation = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

module.exports = celebrate({
  [Segments.BODY]: registerValidation,
});
