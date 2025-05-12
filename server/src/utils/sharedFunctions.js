const { format, isBefore, parseISO } = require('date-fns');
const { enGB } = require('date-fns/locale');

const { notFound } = require('../errors/generalErrors');

const isBeforeCurrentDate = (value) => {
  const currentDate = new Date();
  if (!isBefore(parseISO(value), currentDate)) {
    throw new Error('Дата не може бути у майбутньому');
  }
};

const deathAfterBirth = (value, birthDate) => {
  if (birthDate && isBefore(parseISO(value), parseISO(birthDate))) {
    throw new Error('Дата смерті не може бути раніше дати народження');
  }
};

const formatDateTime = function (date) {
  return format(new Date(date), 'dd MMMM yyyy, HH:mm', { locale: enGB });
};

const getRecordByTitle = async function (Model, title) {
  if (!title) {
    return null;
  }
  const record = await Model.findOne({
    attributes: ['id', 'title'],
    raw: true,
    where: { title },
  });
  if (!record) {
    throw notFound(`${Model.name} not found`);
  }
  return record;
};

module.exports = {
  isBeforeCurrentDate,
  deathAfterBirth,
  formatDateTime,
  getRecordByTitle,
};
