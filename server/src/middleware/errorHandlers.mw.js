/* eslint-disable no-unused-vars */
const { ValidationError } = require('yup');

module.exports.validationErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).send({
      errors: [
        {
          title: 'Validation error!',
          details: err.errors,
        },
      ],
    });
  }
  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return;
  }

  const statusCode = err.status || 500;
  const message = err.message || 'Server Error';

  res.status(statusCode).send(message);
};
