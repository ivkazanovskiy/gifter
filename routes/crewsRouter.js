const router = require('express').Router();
const render = require('../controller/render');

router.route('/')
  .get(render.crews);

router.route('/:id')
  .get(render.members);

router.route('/:crewId/:memberId')
  .get(render.room);

module.exports = router;
