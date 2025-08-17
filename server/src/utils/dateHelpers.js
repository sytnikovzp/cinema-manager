const { format, parse, isValid, isBefore, parseISO } = require('date-fns');
const { enGB } = require('date-fns/locale');

const { badRequest } = require('../errors/generalErrors');

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

const getTime = function (ago = 'allTime') {
  const timeAgo = new Date();
  const intervals = {
    allTime: () => new Date(0),
    day: () => timeAgo.setDate(timeAgo.getDate() - 1),
    month: () => timeAgo.setMonth(timeAgo.getMonth() - 1),
    week: () => timeAgo.setDate(timeAgo.getDate() - 7),
    year: () => timeAgo.setFullYear(timeAgo.getFullYear() - 1),
  };
  return (intervals[ago] || intervals.allTime)();
};

module.exports = {
  stripTime,
  deathAfterBirth,
  formatDateTime,
  formatDate,
  parseAndValidateDate,
  parseDateString,
  isBeforeCurrentDate,
  getTime,
};
