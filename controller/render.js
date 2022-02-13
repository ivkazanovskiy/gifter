const { Op } = require('sequelize');
const {
  User, Crew, Message, Wishlist,
} = require('../db/models');
const normalizeCrews = require('../helpers/normalizeCrews');
const normalizeMembers = require('../helpers/normalizeMembers');
const normalizeRoomMembers = require('../helpers/normalizeRoomMembers');

class Render {
  index(req, res) {
    if (req.body.id) return res.redirect('/crews');

    res.render('index', { user: req.body.id });
  }

  login(req, res) {
    res.render('login', { user: req.body.id });
  }

  registration(req, res) {
    res.render('registration', { user: req.body.id });
  }

  profile(req, res) {
    if (!req.body.id) return res.redirect('/login');

    res.render('profile', { user: req.body.id });
  }

  async crews(req, res) {
    if (!req.body.id) return res.redirect('/login');

    const userId = req.body.id;
    let crews;
    try {
      crews = await User.findAll({
        where: { id: userId },
        attributes: [],
        include: [{
          model: Crew,
        }],
        raw: true,
      });
    } catch (error) { res.json(error); }

    normalizeCrews(crews);

    res.render('crews', {
      crewsPage: true,
      crews,
      user: req.body.id,
    });
  }

  async members(req, res) {
    if (!req.body.id) return res.redirect('/login');
    const crewId = req.params.id;
    const userId = req.body.id;
    let members;
    try {
      members = await User.findAll({
        where: {
          id: { [Op.ne]: userId },
        },
        attributes: ['id', 'name'],
        include: [{
          model: Crew,
          attributes: [],
          where: { id: crewId },
          through: {
            attributes: [],
          },
        }],
        raw: true,
      });
    } catch (error) { res.json(error); }

    normalizeMembers(members, crewId);

    res.render('members', {
      crewId,
      members,
      membersPage: true,
      user: req.body.id,
    });
  }

  async room(req, res) {
    if (!req.body.id) return res.redirect('/login');
    const userId = req.body.id;
    const { crewId, gifterId } = req.params;
    let roomMembers;

    try {
      roomMembers = await Crew.findAll({
        where: { id: crewId },
        include: {
          model: User,
          where: { id: { [Op.ne]: gifterId } },
          attributes: ['id', 'name'],
        },
        raw: true,
      });
    } catch (error) { res.json(error); }

    let wishes;
    try {
      wishes = await Wishlist.findAll({
        where: { userId: gifterId },
        attributes: ['id', 'wish'],
        raw: true,
      });
    } catch (error) { res.json(error); }

    let messages;
    try {
      messages = await Message.findAll({
        where: { crewId, gifterId },
        attributes: ['userId', 'text'],
        raw: true,
      });
    } catch (error) { res.json(error); }

    normalizeRoomMembers(roomMembers);

    res.render('room', {
      user: req.body.id,
      messages,
      roomMembers,
      gifterId,
      crewId,
      userId,
      wishes,
      room: true,
    });
  }

  async newCrew(req, res) {
    if (!req.body.id) return res.redirect('/login');

    res.render('newCrew', { user: req.body.id });
  }

  async addMember(req, res) {
    if (!req.body.id) return res.redirect('/login');
    const { crewId } = req.params;
    res.render('addMember', {
      addMemberPage: true,
      user: req.body.id,
      crewId,
    });
  }

  async wishlist(req, res) {
    if (!req.body.id) return res.redirect('/login');
    const userId = req.body.id;

    let wishes;
    try {
      wishes = await Wishlist.findAll({ userId });
    } catch (error) { res.json(error); }

    res.render('wishlist', { user: userId, wishes });
  }
}

module.exports = new Render();
