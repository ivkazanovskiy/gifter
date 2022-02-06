const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const isAuth = require('../middleware/auth');

function uses(app) {
  app.use(logger('dev'));
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(isAuth);
}

module.exports = uses;
