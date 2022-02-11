const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const isValid = require('../helpers/isValid');
const cookieConfig = require('../config/cookieConfig');
require('dotenv').config();
const render = require('../controller/render');

router.route('/')
  .get(render.registration)
  .post(async (req, res) => {
    let message;

    if (!isValid(req.body)) {
      message = 'incorrect';
      return res.json(message);
    }

    const { name, email, password: passwordUnsec } = req.body;

    const password = await bcrypt.hash(passwordUnsec, 10);
    try {
      const user = await User.create({ name, email, password });
      const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
      res.cookie('tokenId', token, cookieConfig);
      message = 'added';
    } catch (err) {
      message = 'changeEmail';
    }
    res.json(message);
  });

module.exports = router;
