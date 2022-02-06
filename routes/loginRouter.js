const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieConfig = require('../config/cookieConfig');
const { User } = require('../db/models');
require('dotenv').config();

router.route('/')
  .get((req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    let message;
    let user;
    const { email, password } = req.body;

    try {
      user = await User.findOne({
        where: { email },
        raw: true,
      });
    } catch (err) {
      message = 'dbError';
    }

    if (!user) {
      message = 'notFound';
    } else if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
      message = 'authorized';
      res.cookie('tokenId', token, cookieConfig);
    } else {
      message = 'incorrectPassword';
    }
    res.json({ message });
  });
module.exports = router;
