const { response } = require('express');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var counter = 0;
var userCounter = 0;
const gameLogic = require("./Game.js");
const playerLogic = require("./Player.js");

const PLAYER_DIM = 32;

http.listen(5000, function () {


    console.log("[Server started at port 5000]");

});





app.get('/', function (request, response) {

    response.sendFile(__dirname + '/index.html');

})



app.get('/about', function (request, response) {

    response.sendFile(__dirname + '/about.html');

})

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {

    console.log('[SOCKET CONNECTED]' + socket.id);

    socket.on('join-chat', function (userName) {
        console.log('[USER JOINDE CHAT ]', socket.id, userName);
        chatUsers[socket.id] = userName;
        socket.join('chat');
        socket.emit('joined-chat');
        io.to('chat').emit('new-message', `${chatUsers[socket.id]}  joined  chet`);
        userCounter++;
        setInterval(function () { socket.emit('onlineUserCounter', userCounter); }, 1000);
        console.log(userCounter);
    })

    socket.on('send-message', function (message) {
        console.log('[USER SENT MESSAGE]', message)
        io.to('chat').emit('new-message', `${chatUsers[socket.id]}: ${message}`);
    })

    socket.emit('counter', counter);

    socket.on('counter-server', function (increment) {
        socket.join('counterNumber');
        counter += 1;
        io.to('counterNumber').emit('counter', counter);
    })

    socket.on('disconnect', function () {

        console.log('-------disconencted', socket.id);

        if (chatUsers[socket.id] != null) {
            io.to('chat').emit('new-message', `${chatUsers[socket.id]}  left   chet`);
            userCounter--;
            setInterval(function () { socket.emit('onlineUserCounter', userCounter); }, 1000);

        }

    })


    socket.on('create-game', function (gameName) {
        console.log('[NEW GAME CREATED]');
        const gameId = 'game-' + socket.id;
        const players = [new Player()];
        const game = new Game({
            id: gameId,
            players: players
        });
        games[gameId] = game;
        socket.join(gameId);
    })

})

var playerData;
class Player {
    constructor() {
        playerData=playerLogic.playerLogic();
       
    }

    forDraw() {
        return {
            imageId: playerData.imageId,
            drawImageParameters: [
                playerData.imageStartPoints[direction][0],
                0,
                PLAYER_DIM,
                PLAYER_DIM,
                playerData.x,
                playerData.y,
                PLAYER_DIM,
                PLAYER_DIM
            ]
        }
    }

}
var gameData;
class Game {

    constructor(options) {
        gameData=gameLogic.gameLogic(options);
        gameData.start();
    }
    start() {
        const that = gameData;
        setInterval(function () { gameLoop(that.id) }, 1000 / 60);
    }

}

function gameLoop(id) {

    const objectsForDraw = [];
    games[id].player.forEach(function (player) {
        objectsForDraw.push(player.forDraw)
    })
    io.to(id).emit('game-loop', objectsForDraw);


}
const chatUsers = {};
const games = {};



