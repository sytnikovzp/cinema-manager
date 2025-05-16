const { format, parse, isValid, isBefore, parseISO } = require('date-fns');
const { enGB } = require('date-fns/locale');

const { notFound, badRequest } = require('../errors/generalErrors');

const isBeforeCurrentDate = (value) => {
  if (!value) {
    return;
  }
  const currentDate = new Date();
  if (!isBefore(parseISO(value), currentDate)) {
    throw new Error('The date cannot be in the future');
  }
};

const deathAfterBirth = (value, birthDate) => {
  if (!value || !birthDate) {
    return;
  }
  if (isBefore(parseISO(value), parseISO(birthDate))) {
    throw new Error('Date of death cannot be before date of birth');
  }
};

const stripTime = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const formatDateTime = function (date) {
  if (!date) {
    return null;
  }
  return format(new Date(date), 'dd MMMM yyyy, HH:mm', { locale: enGB });
};

const formatDate = function (date) {
  if (!date) {
    return null;
  }
  return format(new Date(date), 'dd MMMM yyyy', { locale: enGB });
};

const parseAndValidateDate = function (dateValue) {
  if (!dateValue) {
    return null;
  }
  const date = parse(dateValue, 'dd MMMM yyyy', new Date(), { locale: enGB });
  if (!isValid(date)) {
    throw badRequest('Invalid date format');
  }
  return date;
};

const parseDateString = (value, originalValue) => {
  if (typeof originalValue === 'string') {
    const trimmed = originalValue.trim();
    if (trimmed === '') {
      return null;
    }
    const parsedDate = parse(trimmed, 'dd MMMM yyyy', new Date(), {
      locale: enGB,
    });
    return isValid(parsedDate) ? parsedDate : null;
  }
  return originalValue;
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
  formatDate,
  parseAndValidateDate,
  stripTime,
  parseDateString,
  getRecordByTitle,
};
