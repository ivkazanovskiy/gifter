const router = require('express').Router();
const render = require('../controller/render');

router.route('/')
  .get(render.profile);

module.exports = router;
