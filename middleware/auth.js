const jwt = require('jsonwebtoken');

require('dotenv').config();

function isAuth(req, res, next) {
  const userToken = req.cookies.tokenId;
  if (userToken) {
    jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
      if (err) {
        return res.clearCookie('tokenId');
      }
      req.body.id = token.id;
    });
  }
  next();
}

module.exports = isAuth;
