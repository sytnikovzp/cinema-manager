const {
  GENRE_VALIDATION_SCHEME,
  COUNTRY_VALIDATION_SCHEME,
  LOCATION_VALIDATION_SCHEME,
  PERSON_VALIDATION_SCHEME,
  MOVIE_VALIDATION_SCHEME,
  STUDIO_VALIDATION_SCHEME,
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
  validatePerson: validateSchema(PERSON_VALIDATION_SCHEME),
  validateCountry: validateSchema(COUNTRY_VALIDATION_SCHEME),
  validateGenre: validateSchema(GENRE_VALIDATION_SCHEME),
  validateLocation: validateSchema(LOCATION_VALIDATION_SCHEME),
  validateMovie: validateSchema(MOVIE_VALIDATION_SCHEME),
  validateStudio: validateSchema(STUDIO_VALIDATION_SCHEME),
};
