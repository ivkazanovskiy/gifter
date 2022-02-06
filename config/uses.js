const express = require('express');
const logger = require('morgan');

function uses(app) {
  app.use(logger('dev'));
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
}

module.exports = uses;
