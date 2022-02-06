const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const isValid = require('../helpers/isValid');

router.route('/')
  .get((req, res) => {
    res.render('registration');
  })
  .post(async (req, res) => {
    let message;

    if (!isValid(req.body)) {
      message = 'incorrect';
      return res.json(message);
    }

    const { name, email, password: passwordUnsec } = req.body;

    const password = await bcrypt.hash(passwordUnsec, 10);
    try {
      await User.create({ name, email, password });
      message = 'added';
    } catch (err) {
      message = 'changeEmail';
    }
    res.json(message);
  });

module.exports = router;
