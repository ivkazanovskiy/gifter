const indexRouter = require('../routes/indexRouter');
const loginRouter = require('../routes/loginRouter');
const logoutRouter = require('../routes/logoutRouter');
const registrationRouter = require('../routes/registrationRouter');
const profileRouter = require('../routes/profileRouter');
const editProfileRouter = require('../routes/editProfileRouter');
const cardsRouter = require('../routes/cardsRouter');
const crewsRouter = require('../routes/crewsRouter');

function routes(app) {
  app.use('/', indexRouter);
  app.use('/login', loginRouter);
  app.use('/logout', logoutRouter);
  app.use('/registration', registrationRouter);
  app.use('/profile', profileRouter);
  app.use('/edit', editProfileRouter);
  app.use('/cards', cardsRouter);
  app.use('/crews', crewsRouter);
}

module.exports = routes;
