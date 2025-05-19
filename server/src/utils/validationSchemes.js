const yup = require('yup');

const { parseDateString, stripTime } = require('../utils/sharedFunctions');

const STRING_SCHEME = yup
  .string('This should be a string')
  .transform((value) => (value === null ? value : value.trim()))
  .max(100, 'The entered data cannot exceed 100 characters');

const TEXT_NULLABLE_SCHEME = yup
  .string('This should be a string')
  .transform((value) => (value === null ? value : value.trim()))
  .max(3000, 'The entered data cannot exceed 3000 characters')
  .nullable();

const NUMBER_NULLABLE_SCHEME = yup
  .number()
  .transform((value, originalValue) => (originalValue === '' ? null : value))
  .typeError('This must be a number')
  .nullable();

const URL_RESOURCE_NULLABLE_SCHEME = yup
  .string('This should be a string')
  .transform((value) => (value === null ? value : value.trim()))
  .max(100, 'The entered data cannot exceed 100 characters')
  .url('Please enter a valid URL')
  .nullable();

const DATE_NULLABLE_SCHEME = yup
  .date()
  .transform(parseDateString)
  .typeError('Incorrect date format')
  .max(stripTime(new Date()), 'The date cannot be in the future')
  .nullable();

const ARRAY_OF_STRING_NULLABLE_SCHEME = yup
  .array('This must be an array')
  .of(yup.string('This should be a string').nullable());

const PAGINATION_SCHEME = yup.object().shape({
  limit: yup
    .number()
    .min(1, 'Minimum value is 1')
    .max(500, 'Maximum value is 500')
    .required('You must specify a limit'),
  offset: yup
    .number()
    .min(0, 'Minimum value is 0')
    .required('You must specify a offset'),
});

const PERSON_VALIDATION_SCHEME = yup.object().shape({
  fullName: STRING_SCHEME.required(),
  country: STRING_SCHEME.nullable(),
  birthDate: DATE_NULLABLE_SCHEME,
  deathDate: DATE_NULLABLE_SCHEME,
  // photo: URL_RESOURCE_NULLABLE_SCHEME,
  photo: TEXT_NULLABLE_SCHEME,
  biography: TEXT_NULLABLE_SCHEME,
});

const COUNTRY_VALIDATION_SCHEME = yup.object().shape({
  title: STRING_SCHEME.required(),
  // flag: URL_RESOURCE_NULLABLE_SCHEME,
  flag: TEXT_NULLABLE_SCHEME,
});

const GENRE_VALIDATION_SCHEME = yup.object().shape({
  title: STRING_SCHEME.required(),
  // logo: URL_RESOURCE_NULLABLE_SCHEME,
  logo: TEXT_NULLABLE_SCHEME,
});

const LOCATION_VALIDATION_SCHEME = yup.object().shape({
  title: STRING_SCHEME.required(),
  country: STRING_SCHEME.nullable(),
  // coatOfArms: URL_RESOURCE_NULLABLE_SCHEME,
  coatOfArms: TEXT_NULLABLE_SCHEME,
});

const MOVIE_VALIDATION_SCHEME = yup.object().shape({
  title: STRING_SCHEME.required(),
  genre: STRING_SCHEME.nullable(),
  releaseYear: NUMBER_NULLABLE_SCHEME,
  // poster: URL_RESOURCE_NULLABLE_SCHEME,
  poster: TEXT_NULLABLE_SCHEME,
  trailer: URL_RESOURCE_NULLABLE_SCHEME,
  storyline: TEXT_NULLABLE_SCHEME,
  studios: ARRAY_OF_STRING_NULLABLE_SCHEME,
  directors: ARRAY_OF_STRING_NULLABLE_SCHEME,
  actors: ARRAY_OF_STRING_NULLABLE_SCHEME,
});

const STUDIO_VALIDATION_SCHEME = yup.object().shape({
  title: STRING_SCHEME.required(),
  location: STRING_SCHEME.nullable(),
  foundationYear: NUMBER_NULLABLE_SCHEME,
  // logo: URL_RESOURCE_NULLABLE_SCHEME,
  logo: TEXT_NULLABLE_SCHEME,
  about: TEXT_NULLABLE_SCHEME,
});

module.exports = {
  PERSON_VALIDATION_SCHEME,
  COUNTRY_VALIDATION_SCHEME,
  GENRE_VALIDATION_SCHEME,
  LOCATION_VALIDATION_SCHEME,
  MOVIE_VALIDATION_SCHEME,
  STUDIO_VALIDATION_SCHEME,
  PAGINATION_SCHEME,
};
