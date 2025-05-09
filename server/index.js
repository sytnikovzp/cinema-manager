const { createServer } = require('http');

const app = require('./src/app');
const {
  API_CONFIG: { SERVER_HOST, SERVER_PORT },
  DB_CONFIG: { DB_NAME },
} = require('./src/constants');
const dbPostgres = require('./src/db/models');

const connectPostgresDB = async () => {
  try {
    await dbPostgres.sequelize.authenticate();
    console.log(
      `Connection to PostgreSQL database <<< ${DB_NAME} >>> is done!`
    );
  } catch (error) {
    console.error(
      `Can not connect to PostgreSQL database ${DB_NAME}!`,
      error.message
    );
  }
};

// ========================= DATABASE CONNECT ==========================
const connectDatabases = async () => {
  try {
    await connectPostgresDB();
  } catch (error) {
    console.error('Error connecting to databases: ', error.message);
    process.exit(1);
  }
};

// ===================== Create and Start Server =======================
const startServer = async () => {
  await connectDatabases();

  const server = createServer(app);

  server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server running at http://${SERVER_HOST}:${SERVER_PORT}/api`);
  });
};
console.log(
  '================== Server is started successfully! =================='
);
startServer();
