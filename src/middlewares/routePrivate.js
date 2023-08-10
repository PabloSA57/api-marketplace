const express = require("express");
const boom = require('@hapi/boom');
const jwt = require("jsonwebtoken");

const routerPrivate = express.Router();

routerPrivate.use((req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, "pepe", (err, decoded) => {
      if (err) {
        next(boom.unauthorized())
      } else {
        req._user = decoded;
        next();
      }
    });
  } else {
    next(boom.notFound('Token no proveido'))
  }
});

module.exports = routerPrivate;