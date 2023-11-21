const { errorLogger } = require("../lib/logger")(__filename);
const { Error404 } = require("../lib/httpError");

exports.notFoundMiddleware = (req, res, next) => {
  next(new Error404());
};

exports.errorHandlerMiddleware = (error, req, res, next) => {
  errorLogger.error(error.message);
  res.status(error.status || 500);
  res.json({ message: { msgBody: error.message, msgError: true } });
};
