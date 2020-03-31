const HttpError = require('../../utils/HttpError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).send({error: err.message});
  } else {
    res.status(500).send({error: 'Internal server error'});
  }

  next();
};

module.exports = errorHandler;
