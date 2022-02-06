const jwt = require('jsonwebtoken');

require('dotenv').config();

function isAuth(req, res, next) {
  const userToken = req.cookies.tokenId;
  if (userToken) {
    jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
      if (err) console.error(err);
      req.body.id = token.id;
      next();
    });
  } else {
    next();
  }
}

module.exports = isAuth;
