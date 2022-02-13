const { Crew, CrewMember } = require('../db/models');

class Crews {
  async new(req, res) {
    if (!req.body.id) return res.json({ message: 'unauthorized' });

    const userId = req.body.id;
    const { name } = req.body;

    let crew;
    try {
      crew = await Crew.create({ name, owner: userId });
    } catch (errors) {
      return res.json({ message: errors.message });
    }
    const crewId = crew.id;

    try {
      await CrewMember.create({ crewId, userId });
    } catch (errors) {
      return res.json({ message: errors.message });
    }

    res.redirect('/crews');
  }

  async addMember(req, res) {
    if (!req.body.id) return res.json({ message: 'unauthorized' });
    const { crewId } = req.params;
    const { memberId } = req.body;
    let member;
    try {
      member = await CrewMember.create({
        crewId,
        userId: memberId,
      });
    } catch (errors) {
      return res.json({ message: errors.message });
    }

    res.json({ message: 'saved' });
  }
}

module.exports = new Crews();
