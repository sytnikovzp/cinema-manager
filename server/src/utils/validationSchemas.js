const yup = require('yup');

const TITLE_NAME_SCHEMA = yup
  .string()
  .trim('Input cannot contain leading or trailing spaces')
  .min(2, 'Input must be at least 2 characters')
  .max(60, 'Input cannot exceed 60 characters')
  .matches(
    /^[A-Z][a-zA-Z0-9\s'–:.-]+(?:\s[A-Z][a-zA-Z0-9\s'–:.-]+)*$/,
    'Input must start with an uppercase letter [A-Z] and can contain letters [A-z], digits, spaces, apostrophes, and dashes.'
  );

const ID_SCHEMA = yup
  .number('This field must be a number!')
  .integer('This field must be integer!')
  .positive('This field must be more than 0!');

const URL_RESOURCE_SCHEMA = yup.string().url().nullable();

const STRING_NULLABLE_SCHEMA = yup.string().nullable();

// ======================================================

const NEW_GENRE_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  logo: URL_RESOURCE_SCHEMA,
});

const PATCH_GENRE_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  logo: URL_RESOURCE_SCHEMA,
});

const NEW_COUNTRY_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  flag: URL_RESOURCE_SCHEMA,
});

const PATCH_COUNTRY_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  flag: URL_RESOURCE_SCHEMA,
});

const NEW_LOCATION_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  countryId: ID_SCHEMA,
  coatOfArms: URL_RESOURCE_SCHEMA,
});

const PATCH_LOCATION_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  countryId: ID_SCHEMA,
  coatOfArms: URL_RESOURCE_SCHEMA,
});

const NEW_PERSON_VALIDATION_SCHEMA = yup.object().shape({
  fullName: TITLE_NAME_SCHEMA.required(),
  countryId: ID_SCHEMA,
  birthDate: STRING_NULLABLE_SCHEMA,
  deathDate: STRING_NULLABLE_SCHEMA,
  photo: URL_RESOURCE_SCHEMA,
  biography: STRING_NULLABLE_SCHEMA,
});

const PATCH_PERSON_VALIDATION_SCHEMA = yup.object().shape({
  fullName: TITLE_NAME_SCHEMA,
  countryId: ID_SCHEMA,
  birthDate: STRING_NULLABLE_SCHEMA,
  deathDate: STRING_NULLABLE_SCHEMA,
  photo: URL_RESOURCE_SCHEMA,
  biography: STRING_NULLABLE_SCHEMA,
});

const NEW_MOVIE_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  genreId: ID_SCHEMA,
  releaseYear: STRING_NULLABLE_SCHEMA,
  poster: URL_RESOURCE_SCHEMA,
  trailer: URL_RESOURCE_SCHEMA,
});

const PATCH_MOVIE_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  genreId: ID_SCHEMA,
  releaseYear: STRING_NULLABLE_SCHEMA,
  poster: URL_RESOURCE_SCHEMA,
  trailer: URL_RESOURCE_SCHEMA,
  storyline: STRING_NULLABLE_SCHEMA,
});

const NEW_STUDIO_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  locationId: ID_SCHEMA,
  foundationYear: STRING_NULLABLE_SCHEMA,
  logo: URL_RESOURCE_SCHEMA,
  about: STRING_NULLABLE_SCHEMA,
});

const PATCH_STUDIO_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  locationId: ID_SCHEMA,
  foundationYear: STRING_NULLABLE_SCHEMA,
  logo: URL_RESOURCE_SCHEMA,
  about: STRING_NULLABLE_SCHEMA,
});

const PAGINATION_SCHEMA = yup.object().shape({
  limit: yup.number().min(1).max(500).required(),
  offset: yup.number().min(0).required(),
});

module.exports = {
  NEW_GENRE_VALIDATION_SCHEMA,
  PATCH_GENRE_VALIDATION_SCHEMA,
  NEW_COUNTRY_VALIDATION_SCHEMA,
  PATCH_COUNTRY_VALIDATION_SCHEMA,
  NEW_LOCATION_VALIDATION_SCHEMA,
  PATCH_LOCATION_VALIDATION_SCHEMA,
  NEW_PERSON_VALIDATION_SCHEMA,
  PATCH_PERSON_VALIDATION_SCHEMA,
  NEW_MOVIE_VALIDATION_SCHEMA,
  PATCH_MOVIE_VALIDATION_SCHEMA,
  NEW_STUDIO_VALIDATION_SCHEMA,
  PATCH_STUDIO_VALIDATION_SCHEMA,
  PAGINATION_SCHEMA,
};
