function webSocket(io, app) {
  io.on('connection', (socket) => {
    console.log('WS has been connected');

    socket.on('toServer:message', (message, userId) => {
      socket.broadcast.emit('toClient:message', message, userId);
    });
    socket.on('disconnect', (socket) => {
      console.log('Disconnect!');
    });
  });
}
module.exports = webSocket;
