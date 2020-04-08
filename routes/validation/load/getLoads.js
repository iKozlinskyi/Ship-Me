const {celebrate, Joi, Segments} = require('celebrate');
const {
  NEW,
  POSTED,
  ASSIGNED,
  SHIPPED,
} = require('../../../constants/loadStatuses');

const querySchema = Joi.object().keys({
  pageNo: Joi.number().positive(),
  size: Joi.number().positive(),
  status: Joi.string().valid(NEW, POSTED, ASSIGNED, SHIPPED),
});

module.exports = celebrate({
  [Segments.QUERY]: querySchema,
});
