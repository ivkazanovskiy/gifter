const indexRouter = require('../routes/indexRouter');
const loginRouter = require('../routes/loginRouter');
const logoutRouter = require('../routes/logoutRouter');
const registrationRouter = require('../routes/registrationRouter');

function routes(app) {
  app.use('/', indexRouter);
  app.use('/login', loginRouter);
  app.use('/logout', logoutRouter);
  app.use('/registration', registrationRouter);
}

module.exports = routes;
