const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const SpaceRanger = require('./models/space_ranger');
const PinkLady = require('./models/pink_lady');
const Game = require('./models/game');
const Bullet = require('./models/bullet');
var youCanFaier = true;
var totalDiamonds = 0;
http.listen(5000, function () {
  console.log('[SERVER STARTED AT PORT 5000]');
})

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
})

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  console.log('[SOCKET CONNECTED]' + socket.id);
  socket.join('menu');
  Object.keys(games).forEach(function (gameId) {
    if (games[gameId].players.length === 1) {
      socket.emit('add-game-to-list', { gameName: games[gameId].name, gameId: gameId })
    }
  })

  socket.on('join-chat', function (userName) {
    console.log('[USER JOINED CHAT]', socket.id, userName);
    chatUsers[socket.id] = userName;
    socket.join('chat');
    socket.emit('joined-chat');
  })

  socket.on('send-message', function (message) {
    console.log('[USER SENT MESSAGE]', message);
    io.to('chat').emit('new-message', `${chatUsers[socket.id]}: ${message}`);
  })

  socket.on('leave-chat', function () {
    console.log('[USER LEFT CHAT]', socket.id);
    delete chatUsers[socket.id];
    socket.leave('chat');
    socket.emit('menu');
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
    totalDiamonds = game.totalDiamonds;

    games[gameId] = game;
    console.log('[User joined ' + gameId + '] room');
    socket.join(gameId);
    io.to('menu').emit('add-game-to-list', { gameName: gameName, gameId: gameId })
  })

  socket.on('start-moving-player', function (direction) {
    if (players[socket.id]) {
      if (games[players[socket.id].gameId].players.length != 2) {
        return;
      }
      players[socket.id].startMoving(direction);
      // console.log('[MOVE PLAYER]', direction)
    }
  })

  socket.on('stop-moving-player', function (axis) {
    if (players[socket.id]) {
      if (games[players[socket.id].gameId].players.length != 2) {
        return;
      }
      players[socket.id].stopMoving(axis);
      // console.log('[STOP PLAYER]', axis)
    }
  })

  socket.on('join-game', function (gameId) {
    console.log(`[SOCKET ${socket.id} JOINED GAME ${gameId}]`);
    players[socket.id] = new PinkLady({ gameId: gameId, socketId: socket.id });
    games[gameId].players.push(players[socket.id]);
    games[gameId].generateDiamonds();
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
      clearInterval(game.gameInterval);
      delete games[gameId];
      playersToRemoveIds.forEach(function (playerToRemoveId) {
        delete players[playerToRemoveId];
      })
      io.to(gameId).emit('game-over', 'player-disconnected', gameId);
    }
  })

  socket.on('back-to-menu', function (gameId) {
    socket.leave(gameId);
    socket.emit('menu');
  })

  socket.on('attack', function () {
    if (players[socket.id]) {
      if (games[players[socket.id].gameId].players.length != 2) {
        return;
      }

      const game = games[players[socket.id].gameId];
      if (game.bullets.length == 0) {
        game.bullets.push(new Bullet(players[socket.id]));
      }
    }
  })
})

function gameLoop(roomId) {
  const game = games[roomId];
  if (game) {
    game.update();

    if (game.over) {
      const playersToRemoveIds = game.players.map(function (player) {
        return player.socketId;
      })
      clearInterval(game.gameInterval);
      delete games[roomId];
      playersToRemoveIds.forEach(function (playerToRemoveId) {
        delete players[playerToRemoveId];
      })
      io.to(roomId).emit('game-over', game.winner + '-won', roomId);
    } else {
      const objectsForDraw = [];
      game.players.forEach(function (player) {
        objectsForDraw.push(player.forDraw());
      })
      game.diamonds.forEach(function (diamond) {
        objectsForDraw.push(diamond.forDraw());
      })
      game.bullets.forEach(function (bullet) {
        objectsForDraw.push(bullet.forDraw());
      })
      const data = {
        objectsForDraw: objectsForDraw,
        gameInProgress: game.players.length == 2
      }
      if (data.gameInProgress) {
        data.score = {
          'space-ranger': game.players[0].score,
          'pink-lady': game.players[1].score,
          'number-diamond': totalDiamonds - game.players[0].score - game.players[1].score
        }
      }
      io.to(roomId).emit('game-loop', data);
    }
  }
}

const chatUsers = {};
const games = {};
const players = {};
const bullets = {};

module.exports.gameLoop = gameLoop;
module.exports.games = games;
