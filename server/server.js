var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: __dirname});
});

io.on('connection', function (socket) {
  console.log('someone connected');
  
  // You'll need to verify that they 
  //   are the app instead of another client.
  
  // When a command is received...
  socket.on('command', function (command) {
    console.log('command received');

    // send the action to the web clients...
    socket.broadcast.emit('action', command);
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
