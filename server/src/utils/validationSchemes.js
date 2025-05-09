const yup = require('yup');

const TITLE_NAME_SCHEME = yup
  .string()
  .trim('Input cannot contain leading or trailing spaces')
  .min(2, 'Input must be at least 2 characters')
  .max(60, 'Input cannot exceed 60 characters')
  .matches(
    /^[A-Z][\d\s'.:A-Za-z–-]+(?:\s[A-Z][\d\s'.:A-Za-z–-]+)*$/,
    'Input must start with an uppercase letter [A-Z] and can contain letters [A-z], digits, spaces, apostrophes, and dashes.'
  );

const ID_SCHEME = yup
  .number('This field must be a number!')
  .integer('This field must be integer!')
  .positive('This field must be more than 0!');

const URL_RESOURCE_SCHEME = yup.string().url().nullable();

const STRING_NULLABLE_SCHEME = yup.string().nullable();

const NEW_GENRE_VALIDATION_SCHEME = yup.object().shape({
  title: TITLE_NAME_SCHEME.required(),
  logo: URL_RESOURCE_SCHEME,
});

const PATCH_GENRE_VALIDATION_SCHEME = yup.object().shape({
  title: TITLE_NAME_SCHEME,
  logo: URL_RESOURCE_SCHEME,
});

const NEW_COUNTRY_VALIDATION_SCHEME = yup.object().shape({
  title: TITLE_NAME_SCHEME.required(),
  flag: URL_RESOURCE_SCHEME,
});

const PATCH_COUNTRY_VALIDATION_SCHEME = yup.object().shape({
  title: TITLE_NAME_SCHEME,
  flag: URL_RESOURCE_SCHEME,
});

const NEW_LOCATION_VALIDATION_SCHEME = yup.object().shape({
  title: TITLE_NAME_SCHEME.required(),
  countryId: ID_SCHEME,
  coatOfArms: URL_RESOURCE_SCHEME,
});

const PATCH_LOCATION_VALIDATION_SCHEME = yup.object().shape({
  title: TITLE_NAME_SCHEME,
  countryId: ID_SCHEME,
  coatOfArms: URL_RESOURCE_SCHEME,
});

const NEW_PERSON_VALIDATION_SCHEME = yup.object().shape({
  fullName: TITLE_NAME_SCHEME.required(),
  countryId: ID_SCHEME,
  birthDate: STRING_NULLABLE_SCHEME,
  deathDate: STRING_NULLABLE_SCHEME,
  photo: URL_RESOURCE_SCHEME,
  biography: STRING_NULLABLE_SCHEME,
});

const PATCH_PERSON_VALIDATION_SCHEME = yup.object().shape({
  fullName: TITLE_NAME_SCHEME,
  countryId: ID_SCHEME,
  birthDate: STRING_NULLABLE_SCHEME,
  deathDate: STRING_NULLABLE_SCHEME,
  photo: URL_RESOURCE_SCHEME,
  biography: STRING_NULLABLE_SCHEME,
});

const NEW_MOVIE_VALIDATION_SCHEME = yup.object().shape({
  title: TITLE_NAME_SCHEME.required(),
  genreId: ID_SCHEME,
  releaseYear: STRING_NULLABLE_SCHEME,
  poster: URL_RESOURCE_SCHEME,
  trailer: URL_RESOURCE_SCHEME,
});

const PATCH_MOVIE_VALIDATION_SCHEME = yup.object().shape({
  title: TITLE_NAME_SCHEME,
  genreId: ID_SCHEME,
  releaseYear: STRING_NULLABLE_SCHEME,
  poster: URL_RESOURCE_SCHEME,
  trailer: URL_RESOURCE_SCHEME,
  storyline: STRING_NULLABLE_SCHEME,
});

const NEW_STUDIO_VALIDATION_SCHEME = yup.object().shape({
  title: TITLE_NAME_SCHEME.required(),
  locationId: ID_SCHEME,
  foundationYear: STRING_NULLABLE_SCHEME,
  logo: URL_RESOURCE_SCHEME,
  about: STRING_NULLABLE_SCHEME,
});

const PATCH_STUDIO_VALIDATION_SCHEME = yup.object().shape({
  title: TITLE_NAME_SCHEME,
  locationId: ID_SCHEME,
  foundationYear: STRING_NULLABLE_SCHEME,
  logo: URL_RESOURCE_SCHEME,
  about: STRING_NULLABLE_SCHEME,
});

const PAGINATION_SCHEME = yup.object().shape({
  limit: yup.number().min(1).max(500).required(),
  offset: yup.number().min(0).required(),
});

module.exports = {
  NEW_GENRE_VALIDATION_SCHEME,
  PATCH_GENRE_VALIDATION_SCHEME,
  NEW_COUNTRY_VALIDATION_SCHEME,
  PATCH_COUNTRY_VALIDATION_SCHEME,
  NEW_LOCATION_VALIDATION_SCHEME,
  PATCH_LOCATION_VALIDATION_SCHEME,
  NEW_PERSON_VALIDATION_SCHEME,
  PATCH_PERSON_VALIDATION_SCHEME,
  NEW_MOVIE_VALIDATION_SCHEME,
  PATCH_MOVIE_VALIDATION_SCHEME,
  NEW_STUDIO_VALIDATION_SCHEME,
  PATCH_STUDIO_VALIDATION_SCHEME,
  PAGINATION_SCHEME,
};
