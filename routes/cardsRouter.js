const router = require('express').Router();
const { Card } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    if (!req.body.id) return res.redirect('/');
    let cards;
    try {
      cards = await Card.findAll({
        where: { userId: req.body.id },
        raw: true,
      });
    } catch (error) {
      // заглушка, надо продумать данный сценарий
      return res.redirect('/');
    }
    res.render('cards', { user: req.body.id, cards });
  });

router.route('/new')
  .get(async (req, res) => {
    if (!req.body.id) return res.redirect('/');

    res.render('newCard', { user: req.body.id });
  })
  .post(async (req, res) => {
    if (!req.body.id) return res.redirect('/');

    const {
      name, state, description, id,
    } = req.body;
    // проверка непустых значений
    // заменить фетчем
    if (!name || !state || !description) return res.redirect('/cards/new');

    try {
      await Card.create({
        name, state, description, userId: id,
      });
    } catch (err) {
      // заглушка, надо фетчем отобразить, что поля не должны быть пустыми
      return res.redirect('/cards/new');
    }

    res.redirect('/cards');
  });

module.exports = router;
