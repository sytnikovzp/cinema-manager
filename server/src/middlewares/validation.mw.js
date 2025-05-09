const {
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
} = require('../utils/validationSchemes');

const validateSchema = (schema) => async (req, res, next) => {
  try {
    const { body } = req;
    await schema.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  validateGenre: validateSchema(NEW_GENRE_VALIDATION_SCHEME),
  validatePatchGenre: validateSchema(PATCH_GENRE_VALIDATION_SCHEME),
  validateCountry: validateSchema(NEW_COUNTRY_VALIDATION_SCHEME),
  validatePatchCountry: validateSchema(PATCH_COUNTRY_VALIDATION_SCHEME),
  validateLocation: validateSchema(NEW_LOCATION_VALIDATION_SCHEME),
  validatePatchLocation: validateSchema(PATCH_LOCATION_VALIDATION_SCHEME),
  validatePerson: validateSchema(NEW_PERSON_VALIDATION_SCHEME),
  validatePatchPerson: validateSchema(PATCH_PERSON_VALIDATION_SCHEME),
  validateMovie: validateSchema(NEW_MOVIE_VALIDATION_SCHEME),
  validatePatchMovie: validateSchema(PATCH_MOVIE_VALIDATION_SCHEME),
  validateStudio: validateSchema(NEW_STUDIO_VALIDATION_SCHEME),
  validatePatchStudio: validateSchema(PATCH_STUDIO_VALIDATION_SCHEME),
};
