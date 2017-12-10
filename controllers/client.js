const playerController = require('./player');
const gameSettings = require('./gameSettings');

module.exports = function (io) {
  setInterval(() => {
    io.sockets.emit('gamedata', playerController.getAllplayers()); 
  }, gameSettings.fps);
  io.on('connection', (socket) => {
    console.log(`New connection ${socket.id}`);
    socket.emit(
      'create',
      {
        canvasWidth: gameSettings.gameWidth,
        canvasHeight: gameSettings.gameHeight,
        id: socket.id
      }
    );
    playerController.addPlayer(socket.id);
    socket.on('requestmove', (direction) => {
      playerController.move(socket.id, direction);
    });
    socket.on('disconnect', () => {
      console.log('Client left');
      playerController.removePlayer(socket.id);
    });
  });
};
