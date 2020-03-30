const {celebrate, Joi, Segments} = require('celebrate');

const loginValidation = Joi.object().keys({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().required(),
}).or('email', 'username');

module.exports = celebrate({
  [Segments.BODY]: loginValidation,
});
