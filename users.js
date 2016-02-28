var users = require('./model/usersModel');

exports.findById = function(req, res) {
    // logic to handle GET /users/
    var ok = function(doc) {
            res.json(doc);
    };
    var err = function(err) {
            res.send(404);
    };
    users.findById(req.body.id, ok, err);
};

exports.create = function(req, res) {
    // logic to handle POST /users
    var ok = function(doc) {
            //res.location('/users/doc._id');
            res.send(201);
    };
    var err = function(err) {
            res.send(409, "Failed to create user");
    };
    console.log("req.body is: " + req);
    users.create(req, ok, err);
};

exports.removeById = function(req, res) {
    // logic to handle DELETE /users/
    var ok = function(doc) {
            res.send(200);
    };
    var err = function(err) {
            res.send(409, "Failed to remove user");
    };
    users.removeById(req.body.id, ok, err);
};

exports.update = function(req, res) {
    if (!req.body._id) {
            res.send(404, "id required");
    } else {
            var ok = function(doc) {
                    res.send(200);
            };
            var err = function(err) {
                    res.send(409, "update failed");
            };
            users.update(req.body, ok, err);
    }

};