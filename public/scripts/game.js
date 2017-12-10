const socket = io.connect('http://192.168.50.48:3000');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 0;
canvas.height = 0;

const myPlayer = new Player();

let otherPlayers = [];

(function () {
  gameLoop();// Start the cycle
}());

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  drawRect();
}

// Draw Rectangle function
function drawRect() {
  ctx.clearRect(0, 0, 800, 600);
  ctx.fillStyle = myPlayer.color; // Fill color of rectangle drawn
  ctx.fillRect(myPlayer.x, myPlayer.y, myPlayer.width, myPlayer.height); // draw main player
  otherPlayers.forEach((p) => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 50, 50);
  });
}

function move(direction) {
  socket.emit('requestmove', direction);
}

// move rectangle inside the canvas using arrow keys
window.onkeydown = function (event) {
  const keyPr = event.keyCode; // Key code of key pressed
  if (keyPr === 68) {
    move(0);
  } else if (keyPr === 65) {
    move(180);
  } else if (keyPr === 87) {
    move(90);
  } else if (keyPr === 83) {
    move(270);
  }
};


socket.on('create', (data) => {
  canvas.width = data.canvasWidth;
  canvas.height = data.canvasHeight;
  myPlayer.id = data.id;
});

socket.on('gamedata', (data) => {
  console.log(data);
  otherPlayers = [];
  data.forEach((p) => {
    if (p.id == myPlayer.id) {
      myPlayer.x = p.x;
      myPlayer.y = p.y;
      myPlayer.width = p.width;
      myPlayer.height = p.height;
      myPlayer.color = p.color;
    } else {
      otherPlayers.push(p);
    }
  });
});

