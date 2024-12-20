const { AppError } = require('../errors');
const { handleError } = require('../utils/responseHandlers');

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    console.error(err.stack);
    return handleError(res, err.message, err.statusCode);
  }

  console.error(err.stack);
  return handleError(res, 'Internal Server Error', 500);
}

module.exports = errorHandler;
