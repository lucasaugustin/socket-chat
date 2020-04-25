var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const messages = [];

io.on('connection', (socket) => {
  io.emit('update-messages', messages);

  socket.on('new-message', (msg) => {
    messages.push(msg);
    io.emit('update-messages', messages);
  });

});

http.listen(8000, () => {
  console.log('listening on *:8000');
});