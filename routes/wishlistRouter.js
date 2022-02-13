const router = require('express').Router();
const render = require('../controller/render');
const { Wishlist } = require('../db/models');

router.route('/')
  .get(render.wishlist);

router.route('/new')
  .post(async (req, res) => {
    if (!req.body.id) return res.json({ message: 'unauthorized' });
    const userId = req.body.id;
    const { wish } = req.body;

    let newWish;
    let message;
    try {
      newWish = await Wishlist.create({ wish, userId });
      message = 'saved';
    } catch (error) { res.json(error); }

    res.json({ message, wishId: newWish.id });
  });

router.route('/delete/:wishId')
  .delete(async (req, res) => {
    if (!req.body.id) return res.json({ message: 'unauthorized' });
    const userId = req.body.id;
    const { wishId } = req.params;
    let message;
    try {
      await Wishlist.destroy({ where: { id: wishId } });
      message = 'deleted';
    } catch (error) { res.json(error); }

    res.json({ message });
  });

module.exports = router;
