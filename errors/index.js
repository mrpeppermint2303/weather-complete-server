const AppError = require('./error');

module.exports = {
  AppError,
  BadRequestError: require('./badRequest'),
  UnauthorizedError: require('./unauthorized'),
  NotFoundError: require('./notFound'),
  PreconditionFailedError: require('./preconditionFailed'),
};
