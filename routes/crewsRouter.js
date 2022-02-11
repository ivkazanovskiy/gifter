const router = require('express').Router();
const render = require('../controller/render');
const crews = require('../controller/crews');

router.route('/')
  .get(render.crews);

router.route('/new')
  .get(render.newCrew)
  .post(crews.new);

router.route('/:id')
  .get(render.members);

router.route('/:crewId/add')
  .get(render.addMember)
  .post(crews.addMember);

router.route('/:crewId/:memberId')
  .get(render.room);

module.exports = router;
