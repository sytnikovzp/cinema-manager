class GeneralError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static badRequest(message, errors = []) {
    return new GeneralError(400, message, errors);
  }

  static notFound(message, errors = []) {
    return new GeneralError(404, message, errors);
  }

  static forbidden(message, errors = []) {
    return new GeneralError(403, message, errors);
  }
}

module.exports = GeneralError;
