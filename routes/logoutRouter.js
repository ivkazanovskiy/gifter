const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    req.session.destroy();
    res.clearCookie('sessionId');
    res.redirect('/');
  });

module.exports = router;
