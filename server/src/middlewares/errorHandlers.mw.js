/* eslint-disable no-unused-vars */
const { ValidationError } = require('yup');

const {
  Sequelize: { BaseError },
} = require('../db/models');

const GeneralError = require('../errors/generalErrors');

const formatError = (title, message) => ({
  severity: 'error',
  title,
  message,
});

module.exports.generalErrorHandler = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res
      .status(err.status)
      .send(formatError('An error occurred', err.message, err.errors));
  }
  return next(err);
};

module.exports.validationErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res
      .status(400)
      .send(formatError('Validation error', err.message, err.errors));
  }
  return next(err);
};

module.exports.sequelizeErrorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res
      .status(406)
      .send(formatError('Database operation error', err.message, err.errors));
  }
  return next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }
  res.status(err?.status ?? 500).send({
    errors: [{ title: err?.message ?? 'Internal server error' }],
  });
};
