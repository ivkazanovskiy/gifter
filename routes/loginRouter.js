const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

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
      req.session.user = user;
      message = 'authorized';
    } else {
      message = 'incorrectPassword';
    }
    res.json(message);
  });
module.exports = router;
