const http = require('http');
// ============================
require('dotenv').config();
// ============================
const db = require('./src/db/models');
const app = require('./src/app');

// =========== Create server with HTTP module ===========
const HOST_NAME = process.env.DB_HOST;

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// ==================== DB CHECK =======================
const dbCheck = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(
      `Connection with DB ${process.env.DB_NAME.toUpperCase()} has been successfully done!`
    );
  } catch (error) {
    console.log('Can not connect to DB: ', error.message);
  }
};

dbCheck();

server.listen(PORT, HOST_NAME, () =>
  console.log(`Server running at http://${HOST_NAME}:${PORT}`)
);

console.log('Server is started!');

// ======================= SYNC`s =======================

const syncModel = async (model) => {
  try {
    await model.sync({ alter: true });
    console.log(`Sync of ${model.name} has been done successfully!`);
  } catch (error) {
    console.log(`Can't sync ${model.name}: `, error.message);
  }
};

// syncModel(db.genres);

const syncModels = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log('Sync all models has been done successfully!');
  } catch (error) {
    console.log('Can not sync all models: ', error.message);
  }
};

// syncModels();
