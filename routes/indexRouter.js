const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.render('index', { user: req.session.user });
  });

module.exports = router;
