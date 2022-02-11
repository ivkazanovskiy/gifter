const router = require('express').Router();
const { User } = require('../db/models');
const isValid = require('../helpers/isValid');

router.route('/')
  .get(async (req, res) => {
    if (!req.body.id) return res.redirect('/login');
    let user;
    try {
      user = await User.findOne({ where: { id: req.body.id }, raw: true });
    } catch (err) {
      return res.redirect('/login');
    }

    res.render('editProfile', {
      user: req.body.id,
      email: user.email,
      name: user.name,
    });
  })
  .put(async (req, res) => {
    if (!req.body.id) return res.json({ message: 'authError' });
    if (!isValid({
      password: '1Ll',
      name: req.body.name,
      email: req.body.email,
    })) return res.json({ message: 'incorrect' });

    console.log(isValid({
      password: '1Ll',
      name: req.body.name,
      email: req.body.email,
    }));

    let message;
    let user;
    try {
      user = await User.findOne({ where: { id: req.body.id } });
    } catch (err) {
      message = 'dbError';
    }

    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      await user.save();
      message = 'saved';
    } else {
      message = 'dbError';
    }

    res.json({ message });
  });

module.exports = router;
