const {
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
} = require('../utils/validationSchemas');

const validateSchema = (schema) => async (req, res, next) => {
  const { body } = req;
  try {
    await schema.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  validateGenre: validateSchema(NEW_GENRE_VALIDATION_SCHEMA),
  validatePatchGenre: validateSchema(PATCH_GENRE_VALIDATION_SCHEMA),
  validateCountry: validateSchema(NEW_COUNTRY_VALIDATION_SCHEMA),
  validatePatchCountry: validateSchema(PATCH_COUNTRY_VALIDATION_SCHEMA),
  validateLocation: validateSchema(NEW_LOCATION_VALIDATION_SCHEMA),
  validatePatchLocation: validateSchema(PATCH_LOCATION_VALIDATION_SCHEMA),
  validatePerson: validateSchema(NEW_PERSON_VALIDATION_SCHEMA),
  validatePatchPerson: validateSchema(PATCH_PERSON_VALIDATION_SCHEMA),
  validateMovie: validateSchema(NEW_MOVIE_VALIDATION_SCHEMA),
  validatePatchMovie: validateSchema(PATCH_MOVIE_VALIDATION_SCHEMA),
  validateStudio: validateSchema(NEW_STUDIO_VALIDATION_SCHEMA),
  validatePatchStudio: validateSchema(PATCH_STUDIO_VALIDATION_SCHEMA),
};
