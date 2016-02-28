var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('makeConnection', "got the req");
  socket.on('postFavour', function (favour) {
    var obj = JSON.parse(favour);
    var uid = obj.uid;
    var favour = obj.favour;
    var fromWhere = obj.fromWhere;
    var starting = obj.starting;
    var ending = obj.ending;
    var meeting = obj.meeting;
    console.log(uid);
    console.log(favour);
    console.log(fromWhere);
    console.log(starting);
    console.log(ending);
    console.log(meeting);
  });
  socket.on('getFavours', function (latlon) {
    //send back json of active favours
  });
  socket.on('newAcc', function (userFB) {
    //add user to the app's user db
  });
  socket.on('getUser', function (user) {
    //send back json of user's info
  });
});

server.listen(3000, function(){
  console.log('listening on localhost:3000');
});