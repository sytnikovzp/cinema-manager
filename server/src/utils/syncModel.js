const { sequelize } = require('../db/models');

const [, , modelName] = process.argv;

if (!modelName) {
  console.error('Please provide a model name, e.g., "npm run syncmodel City"');
  process.exit(1);
}

const model = sequelize.models[modelName];

if (!model) {
  console.error(`Model ${modelName} not found.`);
  process.exit(1);
}

const syncModel = async (model) => {
  try {
    await model.sync({ alter: true });
    console.log('==========================================================');
    console.log(
      `Synchronization of ${model.name} model completed successfully!`
    );
  } catch (error) {
    console.error('==========================================================');
    console.error(`Can't sync ${model.name}: `, error.message);
  }
};

(async () => {
  await syncModel(model);
  process.exit(1);
})();
