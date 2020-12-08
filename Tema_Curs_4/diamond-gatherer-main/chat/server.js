const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(5050, function() {
  console.log('[SERVER STARTED AT PORT 5050]');
})

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
})

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  console.log('[SOCKET CONNECTED]' + socket.id);
  socket.join('menu');


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

})



const chatUsers = {};

