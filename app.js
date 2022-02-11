const express = require('express');
require('dotenv').config();

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const sets = require('./config/sets');
const uses = require('./config/uses');
const routes = require('./config/routes');

const webSocket = require('./config/webSocket');
const dbConnectionChecker = require('./helpers/dbConnectionChecker');

const PORT = process.env.PORT ?? 3000;

sets(app);
uses(app);
routes(app);

server.listen(PORT, () => {
  console.log('The server is connected');
  dbConnectionChecker();
});

webSocket(io, app);
