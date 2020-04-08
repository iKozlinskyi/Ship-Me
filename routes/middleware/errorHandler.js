const HttpError = require('../../utils/HttpError');
const logger = require('../../config/winston');

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).send({error: err.message});
  } else {
    logger.error({message: err.message});
    res.status(500).send({error: 'Internal server error'});
  }

  next();
};

module.exports = errorHandler;
