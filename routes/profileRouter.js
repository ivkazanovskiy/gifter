const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    if (!req.body.id) return res.redirect('/login');

    res.render('profile', { user: req.body.id });
  });

module.exports = router;
