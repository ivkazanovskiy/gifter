const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.clearCookie('tokenId');
    res.redirect('/');
  });

module.exports = router;
