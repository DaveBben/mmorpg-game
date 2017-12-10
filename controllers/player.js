const gameSettings = require('./gameSettings');

const players = [];

module.exports = {
  getRandomColor() {
    const color = [0, 0, 0];
    for (let i = 0; i < 3; i += 1) {
      color[i] = Math.floor(Math.random() * (256 - 0)) + 0;
    }
    return color;
  },

  getRandomPosition() {
    const x = Math.floor(Math.random() * (gameSettings.gameWidth - gameSettings.playerWidth)) + gameSettings.playerWidth;
    const y = Math.floor(Math.random() * (gameSettings.gameHeight - gameSettings.playerHeight)) + gameSettings.playerHeight;
    return [x, y];
  },

  addPlayer(id) {
    const xyCoordinates = this.getRandomPosition();
    const rgbArray = this.getRandomColor();
    if (!this.exisitingPlayer(id)) {
      players.push({
        id,
        width: gameSettings.playerWidth,
        height: gameSettings.playerHeight,
        x: xyCoordinates[0],
        y: xyCoordinates[1],
        color: `rgba(${rgbArray[0]},${rgbArray[1]},${rgbArray[2]},1)`,
      });
    }
  },

  move(id, direction) {
    const player = this.getPlayerById(id);
    if (player) {
      switch (direction) {
        case 0:
          if ((player.x + 20) < (gameSettings.gameWidth - (gameSettings.playerWidth / 2))) { player.x += 20; }
          break;
        case 90:
          if ((player.y - 20) > 0) { player.y -= 20; }
          break;
        case 180:
          if ((player.x - 20) > 0) { player.x -= 20; }
          break;
        case 270:
          if ((player.y + 20) < (gameSettings.gameHeight - (gameSettings.playerWidth / 2))) { player.y += 20; }
          break;
        default:
          console.log('no action');
      }
    }
  },

  getPlayerById(id) {
    let player;
    players.forEach(((element, index, array) => {
      if (element.id == id) {
        player = array[index];
      }
    }));
    return player;
  },

  exisitingPlayer(id) {
    let existing = false;
    players.forEach(((element) => {
      if (element.id == id) {
        existing = true;
      }
    }));
    return existing;
  },


  getAllplayers() {
    return players;
  },

  removePlayer(id) {
    let index = -1;
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == id) {
        index = i;
      }
    }
    players.splice(index, 1);
  },
};
