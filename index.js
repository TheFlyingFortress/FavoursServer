var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('post favour', "got the req");
  socket.on('favour', function (data) {
    var obj = JSON.parse(data);
    console.log(obj.uid);
    console.log(obj.favour);
    console.log(obj.fromWhere);
    console.log(obj.starting);
    console.log(obj.ending);
    console.log(obj.meeting);
  });
});

server.listen(3000, function(){
  console.log('listening on localhost:3000');
});