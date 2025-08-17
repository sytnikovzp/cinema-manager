const { notFound } = require('../errors/generalErrors');

const getRecordByTitle = async function (Model, title) {
  if (!title) {
    return null;
  }
  const record = await Model.findOne({
    attributes: ['uuid', 'title'],
    raw: true,
    where: { title },
  });
  if (!record) {
    throw notFound(`${Model.name} not found`);
  }
  return record;
};

module.exports = {
  getRecordByTitle,
};
