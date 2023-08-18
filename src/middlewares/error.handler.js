const { ValidationError } = require('sequelize');
const boom = require('@hapi/boom');

function logErrors (err, req, res, next) {
  console.error("aqui1",err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.error("aqui2",err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  console.error("aqui3",err);
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
    return
  }
  next(err);
}

function ormErrorHandler(err, req, res, next) {
  console.error("aqui4",err);
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
    return
  }
  next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }