const { isBefore, parseISO } = require('date-fns');

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

module.exports = {
  isBeforeCurrentDate,
  deathAfterBirth,
};
