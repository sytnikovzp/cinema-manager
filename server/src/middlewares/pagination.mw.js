const { PAGINATION_SCHEME } = require('../utils/validationSchemes');

module.exports.paginateElements = async (req, res, next) => {
  try {
    const processPagination = () => {
      const { page, limit } = req.query;
      const defaultPagination = {
        limit: 5,
        offset: 0,
      };
      const pagination = {
        limit: limit ?? 5,
        offset: (page - 1) * limit || 0,
      };

      if (PAGINATION_SCHEME.isValid(pagination)) {
        return pagination;
      }
      return defaultPagination;
    };
    req.pagination = await processPagination();
    next();
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
