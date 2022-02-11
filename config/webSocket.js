const { Message } = require('../db/models');

function webSocket(io, app) {
  io.on('connection', (socket) => {
    console.log('WS has been connected');

    socket.on('toServer:message', async (message) => {
      try {
        const mes = await Message.create({
          text: message.text,
          userId: message.userId,
          gifterId: message.gifterId,
          crewId: message.crewId,
        });
        socket.broadcast.emit('toClient:message', message);
      } catch (error) {
        console.log(error.message);
      }
    });
    socket.on('disconnect', (socket) => {
      console.log('Disconnect!');
    });
  });
}
module.exports = webSocket;
