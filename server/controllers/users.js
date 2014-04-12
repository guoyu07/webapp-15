/**
 * Created by guillaumez on 4/5/2014.
 */

var db = require('../models');
var crypto = require('crypto');
var config = require('../../wwoof-config');

exports.index = function(req, res){

    // Extract query params
    var limit = isNaN(parseInt(req.query.limit)) ? 20 : parseInt(req.query.limit);
    var offset = isNaN(parseInt(req.query.offset)) ? 0 : parseInt(req.query.offset);

    // Find all hosts matching parameters
    db.User.findAll({
        limit: limit,
        offset: offset
        // where: where
    }).success(function(users) {

        // Count total hosts
        db.User.count({
            // where: where
        }).on('success', function(count) {
            res.send({
                users: users,
                meta: {
                    offset: offset,
                    limit: limit,
                    total: count
                }
            });
        })
    });
};

exports.create = function (req, res) {

    console.dir(req.body)

    db.User.find({
        where: { username: req.body.user.username }
    }).success(function (user) {

        // Conflict - User already exists
        if (user) {
            res.send(409)
        }

        // Creates a hash of the password
        var passwordHash = crypto.createHash('sha1').update(req.body.user.password).digest("hex");

        // Creates the user
        db.User.create({
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            username: req.body.user.username,
            passwordHash: passwordHash
        }).success(function (user) {

            // Send mail
            res.mailer.send('signUp', {
                to: user.username,
                subject: 'Welcome to Wwoof France!',
                firstName: user.firstName
            }, function (err) {
                if (err) {
                    // Handle error
                    console.log(err);
                    res.send('There was an error sending the email');
                    return;
                }
                res.send(201);
            });
        })
    })
}