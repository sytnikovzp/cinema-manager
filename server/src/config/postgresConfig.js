const {
  DB_CONFIG: { DB_HOST, DB_DIALECT, DB_USER, DB_PASS, DB_NAME },
} = require('../constants');

module.exports = {
  development: {
    host: DB_HOST,
    dialect: DB_DIALECT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    migrationStorage: 'json',
    seederStorage: 'json',
  },
  production: {},
  test: {},
};
