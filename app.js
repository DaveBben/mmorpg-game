const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// keeping it clean. Moving socket event handlers to controllers
const socketClients = require('./controllers/client')(io);

app.use(express.static('public'));

server.listen(3000, () => console.log('Game running'));

