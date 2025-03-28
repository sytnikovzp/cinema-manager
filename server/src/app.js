const express = require('express');
const cors = require('cors');
const logger = require('morgan');
// ============================
const {
  errorHandlers: { validationErrorHandler, errorHandler },
} = require('./middleware');

const {
  time: { getTime, showTime },
} = require('./middleware');
// ============================
const router = require('./routers');

const app = express();

app.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
);

app.use(express.json());

app.use(getTime, showTime);

app.use(logger('dev'));

// ============================
//  Cinema manager APP
// ============================

app.use('/api', router);
app.use(validationErrorHandler, errorHandler);

module.exports = app;
