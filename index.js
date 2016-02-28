var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongo = require('mongodb');
var monk = require('monk');
var uri = 'localhost:' + (process.env.PORT || 5000);
var db = monk(uri);
console.log('connecting to: ' + uri);
var userDB = db.get('usercollection');
console.log('UserDB' + userDB);


app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('makeConnection', "got the connection");
  socket.on('postFavour', function (favour) {
    var obj = JSON.parse(favour);
    var postid = obj.postid;
    var favour = obj.favour;
    var fromWhere = obj.fromWhere;
    var starting = obj.starting;
    var ending = obj.ending;
    var meeting = obj.meeting;
    console.log(postid);
    console.log(favour);
    console.log(fromWhere);
    console.log(starting);
    console.log(ending);
    console.log(meeting);
  });
  socket.on('getFavours', function (latlon) {
    //send back json of active favours
    console.log("error");
  });
  socket.on('acceptFavour', function (postid) {
    //take favor change the status of the favour to "in-progress"
    console.log("error");
  });
  socket.on('cancelFavour', function (postid) {
    //take favor change the status of the favour to "active"
    console.log("error");
  });
  socket.on('doneFavour', function (postid, uid) {
    //change the status of the favour to "done" and increase user done count by 1
    console.log("error");
  });
  socket.on('newAcc', function (uid) {
    //add user to the app's user db
    console.log("error");
  });
  socket.on('getUser', function (uid) {
    //send back json of user's info
    console.log("error");
  });
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
