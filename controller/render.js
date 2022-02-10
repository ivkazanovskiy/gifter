class Render {
  index(req, res) {
    res.render('index', { user: req.body.id });
  }

  login(req, res) {
    res.render('login');
  }

  registration(req, res) {
    res.render('registration');
  }

  profile(req, res) {
    if (!req.body.id) return res.redirect('/login');

    res.render('profile', { user: req.body.id });
  }

  async crews(req, res) {
    if (!req.body.id) return res.redirect('/login');

    res.render('crews', {
      crews: [
        { id: 1, name: 'Top Ru serva' },
        { id: 2, name: 'John' },
        { id: 3, name: 'Bears' },
      ],
      user: req.body.id,
    });
  }

  async members(req, res) {
    if (!req.body.id) return res.redirect('/login');
    const crewId = req.params.id;
    res.render('members', {
      members: [
        { crewId, memberId: 9, name: 'first' },
        { crewId, memberId: 10, name: 'second' },
        { crewId, memberId: 11, name: 'third' },
      ],
      user: req.body.id,
    });
  }

  async room(req, res) {
    if (!req.body.id) return res.redirect('/login');

    const { crewId, memberId } = req.params;

    res.render('room', { user: req.body.id });
  }
}

module.exports = new Render();
