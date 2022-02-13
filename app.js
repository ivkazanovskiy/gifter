const express = require('express');
require('dotenv').config();

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const TelegramBot = require('node-telegram-bot-api');
const sets = require('./config/sets');
const uses = require('./config/uses');
const routes = require('./config/routes');

const telegramBot = require('./config/telegramBot');
const webSocket = require('./config/webSocket');
const dbConnectionChecker = require('./helpers/dbConnectionChecker');

const PORT = process.env.PORT ?? 3000;

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN_SECRET;
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

sets(app);
uses(app);
routes(app);

server.listen(PORT, () => {
  console.log('The server has been connected');
  dbConnectionChecker();
});

webSocket(io, app);
telegramBot(bot);
