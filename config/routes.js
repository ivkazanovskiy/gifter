const indexRouter = require('../routes/indexRouter');
const loginRouter = require('../routes/loginRouter');
const logoutRouter = require('../routes/logoutRouter');
const registrationRouter = require('../routes/registrationRouter');
const profileRouter = require('../routes/profileRouter');
const editRouter = require('../routes/editRouter');
const cardsRouter = require('../routes/cardsRouter');

function routes(app) {
  app.use('/', indexRouter);
  app.use('/login', loginRouter);
  app.use('/logout', logoutRouter);
  app.use('/registration', registrationRouter);
  app.use('/profile', profileRouter);
  app.use('/edit', editRouter);
  app.use('/cards', cardsRouter);
}

module.exports = routes;
