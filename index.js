var express = require('express');
var path = require('path');
var http = require('http');
var app = express();

//Parsing of the req
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database
var mongo = require('mongodb');
var monk = require('monk');
var uri = 'localhost:27017/FavourServer';
console.log(uri)
var db = monk(uri);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'public')));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(function(req,res,next){
    req.db = db;
    next();
});

//var routes = require('./index');
var users = require('./routes/users');
//app.use('/', routes);
app.use('/users', users);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


// Configure Users db methods
//var users = require('./users');
// app.get('/users/:id', users.findById);
// app.post('/users', users.create);
// app.delete('/users/:id', users.removeById);
// app.put('/users/:id', users.update);

app.post('/postFavour', function(req, res) {
  var param = JSON.stringify(req.body);
  var favour = JSON.parse(param);
  var favourid = favour.favourid;
  var uid = favour.uid;
  var favourTitle = favour.favourTitle;
  var fromWhere = favour.fromWhere;
  var starting = favour.starting;
  var ending = favour.ending;
  var meeting = favour.meeting;
  var description = favour.description;
  console.log(favourid);
  console.log(uid);
  console.log(favourTitle);
  console.log(fromWhere);
  console.log(starting);
  console.log(ending);
  console.log(meeting);
  console.log(description);
  res.send("postFavour sent to server"); 
});

app.get('/getFavours', function(req, res) {
  var params = JSON.stringify(req.body);
  console.log(params);
  res.send("getFavours sent to server"); 
});

app.put('/acceptFavours', function(req, res) {
  var params = JSON.stringify(req.body);
  console.log(params);
  res.send("acceptFavours sent to server"); 
});

app.put('/cancelFavours', function(req, res) {
  var params = JSON.stringify(req.body);
  console.log(params);
  res.send("cancelFavours sent to server"); 
});

app.put('/doneFavours', function(req, res) {
  var params = JSON.stringify(req.body);
  console.log(params);
  res.send("doneFavours sent to server"); 
});

app.post('/newAcc', function(req, res) {
  var params = JSON.stringify(req.body);
  console.log(params);
  res.send("newAcc sent to server"); 
});

app.get('/login', function(req, res) {
  var params = JSON.stringify(req.body);
  console.log(params);
  res.send("login sent to server"); 
});

app.get('/getUser', function(req, res) {
  var params = JSON.stringify(req.body);
  console.log(params);
  res.send("getUser sent to server"); 
});

app.put('/userPraise', function(req, res) {
  var params = JSON.stringify(req.body);
  console.log(params);
  res.send("userPraise sent to server"); 
});

app.put('/userShame', function(req, res) {
  var params = JSON.stringify(req.body);
  console.log(params);
  res.send("userShame sent to server"); 
});

app.get('/getAcceptedFavours', function(req, res) {
  var params = JSON.stringify(req.body);
  console.log(params);
  res.send("getAcceptedFavours sent to server"); 
});