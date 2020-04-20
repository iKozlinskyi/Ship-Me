const {celebrate, Joi, Segments} = require('celebrate');

const resetEmailValidation = Joi.object().keys({
  email: Joi.string().email().required(),
});

module.exports = celebrate({
  [Segments.BODY]: resetEmailValidation,
});
