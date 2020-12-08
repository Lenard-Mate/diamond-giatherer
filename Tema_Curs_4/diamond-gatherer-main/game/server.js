const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const SpaceRanger = require('./models/space_ranger');
const PinkLady = require('./models/pink_lady');
const Game = require('./models/game');

http.listen(5000, function() {
  console.log('[SERVER STARTED AT PORT 5000]');
})

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
})

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  console.log('[SOCKET CONNECTED]' + socket.id);
  socket.join('menu');
  Object.keys(games).forEach(function (gameId) {
    if (games[gameId].players.length === 1) {
      socket.emit('add-game-to-list', { gameName: games[gameId].name, gameId: gameId })
    }
  })

  socket.on('create-game', function (gameName) {
    console.log('[NEW GAME CREATED]');
    const gameId = 'game-' + socket.id;
    players[socket.id] = new SpaceRanger({ gameId: gameId, socketId: socket.id });
    const game = new Game({
      id: gameId,
      players: [players[socket.id]],
      name: gameName
    });
    games[gameId] = game;
    console.log('[User joined ' + gameId + '] room');
    socket.join(gameId);
    io.to('menu').emit('add-game-to-list', { gameName: gameName, gameId: gameId })
  })

  socket.on('start-moving-player', function (direction) {
    if (players[socket.id]) {
      players[socket.id].startMoving(direction);
      // console.log('[MOVE PLAYER]', direction)
    }
  })

  socket.on('stop-moving-player', function (axis) {
    if (players[socket.id]) {
      players[socket.id].stopMoving(axis);
      // console.log('[STOP PLAYER]', axis)
    }
  })

  socket.on('join-game', function (gameId) {
    console.log(`[SOCKET ${socket.id} JOINED GAME ${gameId}]`);
    players[socket.id] = new PinkLady({ gameId: gameId, socketId: socket.id  });
    games[gameId].players.push(players[socket.id]);
    socket.join(gameId);
    io.to('menu').emit('remove-game-from-list', gameId);
  })

  socket.on('disconnect', function () {
    console.log(`[SOCKET ${socket.id} DISCONNECTED]`);
    if (players[socket.id]) {
      const gameId = players[socket.id].gameId;
      const game = games[gameId];
      const playersToRemoveIds = game.players.map(function (player) {
        return player.socketId;
      })
      clearInterval(game.interval);
      delete games[gameId];
      playersToRemoveIds.forEach(function (playerToRemoveId) {
        delete players[playerToRemoveId];
      })
      io.to(gameId).emit('game-over', 'A player disconnected');
    }
  })
})

function gameLoop(id) {
  if (games[id]) {
    games[id].update();
    const objectsForDraw = [];
    games[id].players.forEach(function (player) {
      objectsForDraw.push(player.forDraw());
    })
    io.to(id).emit('game-loop', objectsForDraw);
  }
}


const games = {};
const players = {};

module.exports.gameLoop = gameLoop;
