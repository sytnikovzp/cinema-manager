const { PAGINATION_SCHEMA } = require('../utils/validationSchemas');

module.exports.paginateElements = async (req, res, next) => {
  const { _page, _limit } = req.query;

  const defaultPagination = {
    limit: 500,
    offset: 0,
  };

  const pagination = {
    limit: _limit ?? 500,
    offset: (_page - 1) * _limit || 0,
  };

  try {
    if (await PAGINATION_SCHEMA.isValid(pagination)) {
      req.pagination = pagination;
    } else {
      req.pagination = defaultPagination;
    }
    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
