/*
    User Model
 */
var mongo = require('mongodb');
var monk = require('monk');
var uri = "localhost:5000";
var db = monk(uri);
console.log('connecting to: ' + uri);
var userDB = db.get('users');

var User = (function () {
    function User(json) {
        if (json) {
        	this.id = json._id; // Not sure if this is needed
            //this.uid = json.uid;
            this.username = json.username;
            this.favoursDone = json.favoursDone;
            this.favoursPosted = json.favoursPosted;
            this.favoursPostedID = json.faoursPostedID;
            this.favoursInProgressID = json.favoursInProgressID;
            this.thumbsUp = json.thumbsUp;
            this.thumbsDown = json.thumbsDown;
        }
    }
    User.create = function (id, username, callback) {
    	userDB.insert({
    		'id': id,
    		'username': username,
    		'favoursDone': 0,
    		'favoursPosted': 0,
    		'favoursPostedID': "", // Not sure if this is right
    		'favoursInProgressID': "",
    		'thumbsUp': 0,
    		'thumbsDown': 0
    	}, function (err, user) {
    		if (err)
    			return callback(err, null);
    		console.log('User created with ID: ' + user._id);
    		return callback(null, new User(user));
    	});
    };
    User.getById = function (id, asJSON, fn) {
        console.log('Getting User with id: ' + id);
        userDB.findOne({
            'id': id
        }, function (err, user) {
            console.log(user);
            if (err)
                return fn(err, null);
            var rUser = user;
            if (!asJSON)
                rUser = new User(user);
            fn(null, rUser);
        });
    };
    User.getByUsername = function (username, fn) {
        console.log('Getting User with username: ' + username);
        userDB.findOne({
            'username': username
        }, function (err, user) {
            if (err)
                return fn(err, null);
            if (!user)
                return fn(null, null);
            fn(null, new User(user));
        });
    };
    User.update = function (id, fn) {
    };
    User.delete = function (id, fn) {
    };
    return User;
})();
module.exports = User;
