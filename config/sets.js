const hbs = require('hbs');

function sets(app) {
  app.set('view engine', 'hbs');
  hbs.registerPartials('../views/partials');
}

module.exports = sets;
