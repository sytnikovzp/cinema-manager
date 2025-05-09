const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '..', '..', '..', '.env'),
});

module.exports.API_CONFIG = require('./apiConfig');
module.exports.DB_CONFIG = require('./dbConfig');
module.exports.POSTGRES_DATA = require('./postgresData');
