const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const {
  API_CONFIG: { CLIENT_URL },
} = require('./constants');
const {
  time: { getTime, showTime },
} = require('./middlewares');
const {
  errorHandlers: {
    generalErrorHandler,
    validationErrorHandler,
    sequelizeErrorHandler,
    errorHandler,
  },
} = require('./middlewares');

const router = require('./routers');

const app = express();

app.use(
  cors({
    credentials: true,
    exposedHeaders: ['X-Total-Count'],
    origin: CLIENT_URL,
  })
);

app.use(express.json());

app.use(getTime, showTime);

app.use(morgan('dev'));

app.use('/api', router);

app.use(
  generalErrorHandler,
  validationErrorHandler,
  sequelizeErrorHandler,
  errorHandler
);

module.exports = app;
